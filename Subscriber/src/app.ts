import { SubscriberSocket } from './subscriber-socket';
import * as readline from 'readline';
import { Payload } from './payload';

(async function main() {
  console.log('Subscriber');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const topic = await read(rl, 'Topic: ');
  const subscriberSocket = new SubscriberSocket(topic);

  subscriberSocket.connect(8888, '127.0.0.1');
})();

function read(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}
