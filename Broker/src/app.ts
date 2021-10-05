import { BrokerServer } from './broker-server';
import { TStorage } from './storage';
import { Worker } from './worker';

const brokerServer = new BrokerServer(); // one instance per module
const worker = new Worker();

(function main() {
  console.log('Broker');
  brokerServer.start(8888, '127.0.0.1');

  setInterval(async () => {
    await worker.run();
  }, 500);
})();
