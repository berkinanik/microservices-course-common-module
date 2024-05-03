import { Subjects } from '../subjects';

export interface PaymentAwaitedEvent {
  subject: Subjects.PaymentAwaited;
  data: {
    orderId: string;
  };
}
