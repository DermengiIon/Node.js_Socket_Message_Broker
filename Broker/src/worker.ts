import { TStorage } from './storage';

export class Worker {
  async run() {
    await TStorage._mutex.runExclusive(async () => {
      const payloads = TStorage.payloads;

      if (!payloads.length) {
        return;
      }

      while (payloads.length) {
        const payload = payloads.splice(0, 1)[0];
        const connectionsByTopic = TStorage.getConnectionsByTopic(
          payload.topic,
        );

        for (const connection of connectionsByTopic) {
          if (connection.topic !== payload.topic) {
            continue;
          }

          await new Promise((resolve, reject) => {
            connection.socket?.write(payload.message, () => {
              resolve(true);
            });
          });
        }
      }
    });
  }
}
