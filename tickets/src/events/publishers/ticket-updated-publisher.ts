import { Publisher, Subjects, TicketUpdatedEvent } from '@rshub/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
