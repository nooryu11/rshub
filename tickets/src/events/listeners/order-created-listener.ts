import {Message} from 'node-nats-streaming';
import{Subjects,Listener,OrderCreatedEvent,NotFoundError} from '@rshub/common';
import {Ticket} from  '../../models/ticket'
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher'

export  class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = "tickets-service";
   async onMessage(data:OrderCreatedEvent['data'],msg:Message){
       var ticket = await Ticket.findById(data.ticket.id)
       if(!ticket) throw new NotFoundError()

       ticket.set({orderId:data.id})
       await ticket.save();
       await new TicketUpdatedPublisher(this.client).publish({
           id:ticket.id!,
           title:ticket.title,
           price: ticket.price,
           version:ticket.version,
           userId: ticket.userId,
           orderId: ticket.orderId

       })
        msg.ack()
    }

}