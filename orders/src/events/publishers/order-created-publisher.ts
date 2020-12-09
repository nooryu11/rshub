import { Publisher, OrderCreatedEvent, Subjects } from '@rshub/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
