import { OrderStatus } from '../../types';
import { Subjects } from '../subjects';

export interface OrderUpdatedEvent {
  subject: Subjects.OrderUpdated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
  };
}
