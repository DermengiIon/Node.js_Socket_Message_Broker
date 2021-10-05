import { Mutex } from 'async-mutex';
import { AddressInfo } from 'net';
import { ConnectionInfo } from './connection-info';
import { Payload } from './payload';

export class TStorage {
  private static _connections: ConnectionInfo[] = [];
  private static _payloads: Payload[] = [];
  static readonly _mutex = new Mutex();

  static get connections() {
    return this._connections;
  }

  static get payloads() {
    return this._payloads;
  }

  static async addConnection(connection: ConnectionInfo) {
    await this._mutex.runExclusive(() => {
      this._connections.push(connection);
    });
  }

  static async addPayload(payload: Payload) {
    await this._mutex.runExclusive(() => {
      this._payloads.push(payload);
    });
  }

  static async removeConnection(address: string, port: number) {
    await this._mutex.runExclusive(() => {
      const index = this._connections.findIndex(
        (connection) =>
          connection.remoteAddress === address &&
          connection.remotePort === port,
      );

      if (index > -1) {
        this._connections.splice(index, 1);
      }
    });
  }

  static getConnectionsByTopic(topic: string): ConnectionInfo[] {
    return this._connections.filter((conn) => conn.topic === topic);
  }
}
