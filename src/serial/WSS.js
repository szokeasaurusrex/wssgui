import { BAUD_RATE, START_BUZZ_COMMAND, STOP_BUZZ_COMMAND } from './constants';

const SerialPort = window.require('serialport');


class WSS {
  constructor() {
    this.port = null;
    this.eventListeners = [];
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
    if (this.port != null && this.port.isOpen) {
      this.port.close();
    }

    this.port = new SerialPort(portName, {
      baudRate: BAUD_RATE,
    });

    this.eventListeners.forEach(({ event, callback }) => this.port.on(event, callback));
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

  on(event, callback) {
    this.eventListeners.push({ event, callback });
  }
}

export default WSS;
