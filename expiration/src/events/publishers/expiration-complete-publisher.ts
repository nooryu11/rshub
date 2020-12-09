import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@rshub/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
