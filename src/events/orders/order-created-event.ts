import { OrderStatus } from '../../types';
import { Subjects } from '../subjects';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt?: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
