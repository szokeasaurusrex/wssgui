import EventEmitter from 'events';
import * as constants from '../constants';

const SerialPort = window.require('serialport');

function applyIntensityLinearization(intensity) {
  if (intensity < constants.MIN_INTENSITY
    || intensity > constants.MAX_INTENSITY
    || intensity === 0) {
    // Return 0 if out of accepted intensity range or if intensity is zero
    return 0;
  }
  // Convert intensity (in mA) to a value the board understands
  // based on amplitude linearization curve
  return (1.12 * +intensity + 3.35) * 2.55;
}

function genSubChannelCode(subChannel) {
  if (subChannel == null) {
    // Return two zeros, default for nonconfigurable channel
    return [0x00, 0x00];
  }

  return [
    subChannel.sourceSink === 'sink' ? constants.SINK_CODE : constants.SOURCE_CODE,
    applyIntensityLinearization(subChannel.intensity),
  ];
}

function genSetAmplitudesCommand(channels) {
  const command = [...constants.SET_AMPLITUDE_COMMAND_PREFIX];

  ['stim', 'rchrg'].forEach((subChannelType) => {
    for (let i = 0; i < constants.NUM_CONFIGURABLE_CHANNELS; i += 1) {
      command.push(...genSubChannelCode(channels[i][subChannelType]));
    }

    for (let i = constants.NUM_CONFIGURABLE_CHANNELS; i < constants.NUM_CHANNELS; i += 1) {
      command.push(...genSubChannelCode());
    }
  });

  command.push(...constants.SET_AMPLITUDE_COMMAND_SUFFIX);
  return command;
}

function genSetTimingsCommand(timings) {
  const command = [...constants.SET_TIMINGS_COMMAND_PREFIX];

  // Double check validity of each input
  if (timings.stimPW >= constants.MIN_STIM_PW
    && timings.stimPW <= constants.MAX_STIM_PW) {
    // The + operator is needed here to convert string to number
    command.push(+timings.stimPW);
  } else {
    command.push(0x00);
  }

  if (timings.interpulseDelay >= constants.MIN_INTERPULSE_DELAY
    && timings.interpulseDelay <= constants.MAX_INTERPULSE_DELAY) {
    command.push(+timings.interpulseDelay);
  } else {
    command.push(0x00);
  }

  if (timings.rchrgPW >= constants.MIN_RCHRG_PW
    && timings.rchrgPW <= constants.MAX_RCHRG_PW) {
    command.push(+timings.rchrgPW);
  } else {
    command.push(0x00);
  }

  if (timings.pulsePeriod >= constants.MIN_PULSE_PERIOD
    && timings.pulsePeriod <= constants.MAX_PULSE_PERIOD) {
    command.push(+timings.pulsePeriod);
  } else {
    command.push(0x00);
  }

  command.push(...constants.SET_TIMINGS_COMMAND_SUFFIX);

  return command;
}

function intervalExcecute(interval, ...callbacks) {
  if (callbacks.length > 0) {
    // Remove first callback from callbacks, save value in firstCallback
    const firstCallback = callbacks.shift();

    // Execute firstCallback
    firstCallback();

    // Set timeout for intervalExcecute on remaining callbacks
    setTimeout(() => intervalExcecute(interval, ...callbacks), interval);
  }
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
    return portList;
  }

  setPortName(portName) {
    if (this.port != null && this.port.isOpen) {
      // Add listener to reexecute setPortName once port closed
      this.port.once('close', () => this.setPortName(portName));

      // Close the port
      this.port.close();
    } else {
      // Create the new port
      this.port = new SerialPort(portName, {
        baudRate: constants.BAUD_RATE,
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
  }

  getPortName() {
    return this.port ? this.port.path : '';
  }

  startBuzz() {
    if (this.port != null) {
      this.port.write(constants.START_BUZZ_COMMAND);
    }
  }

  stopBuzz() {
    if (this.port != null) {
      this.port.write(constants.STOP_BUZZ_COMMAND);
    }
  }

  closePort() {
    this.port.close();
  }

  startStim(stimParams) {
    if (this.port != null) {
      const actions = [];
      if (stimParams != null) {
        if (stimParams.amplitudes != null && stimParams.amplitudes.length > 0) {
          // Send set amplitude command
          actions.push(() => this.port.write(genSetAmplitudesCommand(stimParams.amplitudes)));
        }
        if (stimParams.timings != null && Object.keys(stimParams.timings).length > 0) {
          actions.push(() => this.port.write(genSetTimingsCommand(stimParams.timings)));
        }
      }

      actions.push(() => this.port.write(constants.START_STIM_COMMAND));

      // Wait 100 ms between sending each command to ensure board receives command
      intervalExcecute(100, ...actions);
    }
  }
}

export default WSS;
