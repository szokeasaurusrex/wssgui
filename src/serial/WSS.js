import EventEmitter from 'events';
import {
  BAUD_RATE, START_BUZZ_COMMAND, STOP_BUZZ_COMMAND,
} from '../constants';

const SerialPort = window.require('serialport');


class WSS extends EventEmitter {
  constructor() {
    super();
    this.port = null;
    this.openFirstPort();
  }

  static async listPortNames() {
    return (await SerialPort.list()).map(port => port.comName);
  }

  async openFirstPort() {
    const portList = await WSS.listPortNames();
    if (portList.length > 0) {
      this.setPortName(portList[0]);
    }
  }

  setPortName(portName) {
    // Close the port if it is open already
    if (this.port != null && this.port.isOpen) {
      this.port.close();
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
}

export default WSS;
