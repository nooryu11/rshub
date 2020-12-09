import {PaymentCreatedEvent, Publisher, Subjects, TicketCreatedEvent } from '@rshub/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
