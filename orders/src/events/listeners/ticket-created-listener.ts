import {Message} from 'node-nats-streaming';
import{Subjects,Listener,TicketCreatedEvent} from '@rshub/common';
import {Ticket} from  '../../models/ticket'
import { idText } from 'typescript';


export  class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "order-service";
   async onMessage(data:TicketCreatedEvent['data'],msg:Message){
        const {title, price,id} = data;
        const ticket = new Ticket({
          _id:id,  title, price})
        await ticket.save()
        msg.ack()
    }

}