import {Publisher, Subjects, TicketCreatedEvent } from '@rshub/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
