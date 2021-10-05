import * as net from 'net';
import { PayloadHandler } from './payload-handler';

export class SubscriberSocket {
  private readonly _socket: net.Socket;
  private readonly _topic: string;

  constructor(topic: string) {
    this._topic = topic;
    this._socket = new net.Socket();
  }

  connect(PORT: number, HOST: string) {
    this._socket.connect(PORT, HOST, () => {
      console.info('CONNECTED TO ' + HOST + ':' + PORT);

      const data = 'subscribe#' + this._topic;
      this.send(data);
    });

    this._socket.on('data', this.dataCallback);
    this._socket.on('error', this.errorCallback);
  }

  ready(callback: () => {}) {
    this._socket.on('ready', callback);
  }

  send(data: string, callback = () => {}) {
    this._socket.write(data, callback);
  }

  private dataCallback(data: Buffer) {
    PayloadHandler.handle(data);
  }

  private errorCallback(error: Error) {
    console.error('::', error.name, error.message);
  }
}
