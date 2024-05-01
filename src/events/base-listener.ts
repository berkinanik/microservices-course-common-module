import type { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): Promise<void>;

  constructor(protected client: Stan, protected ackWait = 5 * 1000) {}

  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        // deliver all messages from the beginning
        .setDeliverAllAvailable()
        // require manual acknowledgment of messages
        .setManualAckMode(true)
        // set the maximum time to wait for an acknowledgment
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupName)
    );
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions(),
    );

    subscription.on('message', (msg: Message) => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          `>>>[${this.subject}][${this.queueGroupName}]: message#${msg.getSequence()} received`,
        );
      }

      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg)
        .then(() => msg.ack())
        .catch(console.error);
    });
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf-8'));
  }
}
