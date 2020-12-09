import {Message} from 'node-nats-streaming';
import{Subjects,Listener,OrderCreatedEvent,NotFoundError} from '@rshub/common';
import {Order} from  '../../models/order'


export  class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = "payments-service";
   async onMessage(data:OrderCreatedEvent['data'],msg:Message){
       var order = new Order({
           _id: data.id,
           userId: data.userId,
           version: data.version,
           price:data.ticket.price,
           status: data.status
       })
    await order.save()
    msg.ack()
    }

}