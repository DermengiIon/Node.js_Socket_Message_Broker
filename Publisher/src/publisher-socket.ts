import * as net from 'net';

export class PublisherSocket {
  private readonly _socket: net.Socket;

  constructor() {
    this._socket = new net.Socket();
  }

  connect(PORT: number, HOST: string) {
    this._socket.connect(PORT, HOST, () => {
      console.info('CONNECTED TO ' + HOST + ':' + PORT);
    });

    this._socket.on('error', this.errorCallback);
  }

  ready(callback: () => {}) {
    this._socket.on('ready', callback);
  }

  send(data: string, callback = () => {}) {
    this._socket.write(data, callback);
  }

  private errorCallback(error: Error) {
    console.error('::', error.name, error.message);
  }
}
