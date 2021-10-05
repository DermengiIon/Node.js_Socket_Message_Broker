import { Payload } from './payload';

export class PayloadHandler {
  static handle(data: Buffer) {
    if (!Buffer.isBuffer(data)) {
      console.info('The buffer is invalid!');
    }

    const message = data.toString('utf-8', 0, data.length);

    console.log('Received message: ', message);
  }
}
