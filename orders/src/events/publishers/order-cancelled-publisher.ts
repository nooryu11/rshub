import { Subjects, Publisher, OrderCancelledEvent } from '@rshub/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
