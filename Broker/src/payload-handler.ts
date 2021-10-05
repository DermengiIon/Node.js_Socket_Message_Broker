import { ConnectionInfo } from './connection-info';
import { TStorage } from './storage';
import { Payload } from './payload';

export class PayloadHandler {
  static async handle(data: Buffer, connectionInfo: ConnectionInfo) {
    if (!Buffer.isBuffer(data)) {
      console.info('The buffer is invalid!');
    }

    const payloadString = data.toString('utf-8', 0, data.length);
    const subscribe = 'subscribe#';

    if (payloadString.startsWith(subscribe)) {
      connectionInfo.topic = payloadString.split(subscribe)[1] as string;
      await TStorage.addConnection(connectionInfo);
    } else {
      const payload: Payload = JSON.parse(payloadString);
      await TStorage.addPayload(payload);
    }
  }
}
