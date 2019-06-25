import EventEmitter from 'events';
import {
  BAUD_RATE, START_BUZZ_COMMAND, STOP_BUZZ_COMMAND,
  START_STIM_COMMAND, SET_AMPLITUDE_COMMAND_PREFIX,
  SET_AMPLITUDE_COMMAND_SUFFIX, SINK_CODE, SOURCE_CODE,
  NUM_CONFIGURABLE_CHANNELS, NUM_CHANNELS, MIN_INTENSITY,
  MAX_INTENSITY,
} from '../constants';

const SerialPort = window.require('serialport');

function applyIntensityLinearization(intensity) {
  if (intensity < MIN_INTENSITY || intensity > MAX_INTENSITY || intensity === 0) {
    // Return 0 if out of accepted intensity range or if intensity is zero
    return 0;
  }
  // Convert intensity (in mA) to a value the board understands
  // based on amplitude linearization curve
  return (1.12 * intensity + 3.35) * 2.55;
}

function genSubChannelCode(subChannel) {
  if (subChannel == null) {
    // Return two zeros, default for nonconfigurable channel
    return [0x00, 0x00];
  }

  return [
    subChannel.sourceSink === 'sink' ? SINK_CODE : SOURCE_CODE,
    applyIntensityLinearization(subChannel.intensity),
  ];
}

function genSetAmplitudeCommand(channels) {
  const command = [...SET_AMPLITUDE_COMMAND_PREFIX];

  ['stim', 'rchrg'].forEach((subChannelType) => {
    for (let i = 0; i < NUM_CONFIGURABLE_CHANNELS; i += 1) {
      command.push(...genSubChannelCode(channels[i][subChannelType]));
    }

    for (let i = NUM_CONFIGURABLE_CHANNELS; i < NUM_CHANNELS; i += 1) {
      command.push(...genSubChannelCode());
    }
  });

  command.push(...SET_AMPLITUDE_COMMAND_SUFFIX);
  return command;
}

class WSS extends EventEmitter {
  constructor() {
    super();
    this.port = null;
    this.openFirstPort();
  }

  static async listPorts() {
    return (await SerialPort.list()).map(port => port.comName);
  }

  async openFirstPort() {
    const portList = await WSS.listPorts();
    if (portList.length > 0) {
      this.setPortName(portList[0]);
    }
  }

  setPortName(portName) {
    // Close the port if it is open already
    if (this.port != null && this.port.isOpen) {
      this.port.close();
      delete this.port;
    } else if (this.port !== null) {
      delete this.port;
    }

    // Create the new port
    this.port = new SerialPort(portName, {
      baudRate: BAUD_RATE,
    });

    // Listen to existing events
    super.eventNames().forEach(
      event => this.port.on(event, (...args) => super.emit(event, ...args)),
    );

    // Listen to newly added events
    super.on('newListener', (event) => {
      if (!super.eventNames().includes(event)) {
        this.port.on(event, (...args) => super.emit(event, ...args));
      }
    });

    // Remove event listener if all listeners deleted
    super.on('removeListener', (event) => {
      if (!super.eventNames().includes(event)) {
        this.port.off(event, (...args) => super.emit(event, ...args));
      }
    });
  }

  getPortName() {
    return this.port ? this.port.path : '';
  }

  startBuzz() {
    if (this.port != null) {
      this.port.write(START_BUZZ_COMMAND);
    }
  }

  stopBuzz() {
    if (this.port != null) {
      this.port.write(STOP_BUZZ_COMMAND);
    }
  }

  closePort() {
    this.port.close();
  }

  startStim(stimParams) {
    if (this.port != null) {
      if (stimParams != null) {
        if (stimParams.amplitudes != null && stimParams.amplitudes.length > 0) {
          // Send set amplitude command
          this.port.write(genSetAmplitudeCommand(stimParams.amplitudes));
        }
      }
      setTimeout(this.port.write(START_STIM_COMMAND), 100);
    }
  }
}

export default WSS;
