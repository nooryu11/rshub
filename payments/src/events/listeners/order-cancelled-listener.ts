import {Message} from 'node-nats-streaming';
import{Subjects,Listener,OrderCancelledEvent,NotFoundError, OrderStatus} from '@rshub/common';
import {Order} from  '../../models/order'



export  class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = "payments-service";
   async onMessage(data:OrderCancelledEvent['data'],msg:Message){
       var order = await Order.findOne({
           _id: data.id,
           version:data.version - 1
       })
       if(!order) throw new NotFoundError()
       order.set({status:OrderStatus.Cancelled})
       await order.save();
  
        msg.ack()
    }

}