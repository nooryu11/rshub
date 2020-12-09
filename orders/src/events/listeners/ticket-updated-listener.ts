import {Message} from 'node-nats-streaming';
import{Subjects,Listener,TicketUpdatedEvent} from '@rshub/common';
import {Ticket} from  '../../models/ticket'
import { idText } from 'typescript';


export  class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = "order-service";
   async onMessage(data:TicketUpdatedEvent['data'],msg:Message){
        const {title, price,id,version} = data;
        const ticket = await Ticket.findOne({
            _id :id,
            version: version - 1 //if thsi exist then it means it is in correct order
        })
        if(!ticket){
            throw new Error('Cannot find ticket');  
        }
        ticket.set({title,price})
        await ticket.save()
        msg.ack()
    }

}