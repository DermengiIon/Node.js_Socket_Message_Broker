import { PublisherSocket } from './publisher-socket';
import * as readline from 'readline';
import { Payload } from './payload';

const publisherSocket = new PublisherSocket(); // one instance per module

(function main() {
  console.log('Publisher');

  publisherSocket.connect(8888, '127.0.0.1');
  publisherSocket.ready(readyCallback);
})();

async function readyCallback() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await infinityReadline(rl);
}

async function infinityReadline(rl: readline.Interface) {
  while (true) {
    const topic = await read(rl, 'Topic: ');
    const message = await read(rl, 'Message: ');
    const payload: Payload = { topic, message };

    const payloadString = JSON.stringify(payload);

    publisherSocket.send(payloadString);
  }
}

function read(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}
