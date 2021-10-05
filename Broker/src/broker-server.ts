import * as net from 'net';
import { ConnectionInfo } from './connection-info';
import { PayloadHandler } from './payload-handler';
import { TStorage } from './storage';

export class BrokerServer {
  private readonly _server: net.Server;
  private readonly CONNECTIONS_LIMIT = 8;
  constructor() {
    this._server = new net.Server();
  }

  start(PORT: number, HOST: string) {
    this._server.listen(PORT, HOST, this.CONNECTIONS_LIMIT);
    this._server.on('connection', this.connectionCallback.bind(this));
    this._server.on('error', this.errorCallback.bind(this));
  }

  private connectionCallback(connection: net.Socket) {
    const connectionInfo: ConnectionInfo = {
      socket: connection,
      remoteAddress: connection.remoteAddress,
      remotePort: connection.remotePort,
    };

    connection.on('data', async (data: any) => {
      await this.receiveCallback(data, connectionInfo);
    });

    connection.on('error', this.errorCallback.bind(this));

    connection.on('close', async () => {
      await this.connectionCloseCallback(connectionInfo);
    });
  }

  private async receiveCallback(data: Buffer, connectionInfo: ConnectionInfo) {
    await PayloadHandler.handle(data, connectionInfo);
  }

  private errorCallback(error: Error) {
    console.error('::', error.name, error.message);
  }

  private async connectionCloseCallback(connectionInfo: ConnectionInfo) {
    await TStorage.removeConnection(
      connectionInfo.remoteAddress as string,
      connectionInfo.remotePort as number,
    );
  }
}
