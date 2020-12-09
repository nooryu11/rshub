import {OrderCancelledListener} from '../order-cancelled-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose'
import {OrderCancelledEvent, OrderStatus} from '@rshub/common'
import {Message} from 'node-nats-streaming'
import {Order} from '../../../models/order'
const setup = async()=>{
    const listener = new OrderCancelledListener(natsWrapper.client)
    var order = new Order({
        _id: new mongoose.Types.ObjectId().toHexString(),
        userId: 'greg',
        version: 0,
        price:15,
        status: OrderStatus.Created
    })
    await order.save()
 
    console.log("999-0",order)
   const data: OrderCancelledEvent['data'] = {
    version: 1,
    id: order.id,
    status: OrderStatus.Cancelled,
    ticket:{
        id:'grwf'
    }
}
    //@ts-ignore
    const msg: Message ={
        ack: jest.fn()
    }
    return {listener,data,msg,order}
}
it('find and update order', async()=>{
    const {data,msg,listener,order} = await setup();
    console.log("999",data)
    await listener.onMessage(data,msg)

    const updatedOrder = await Order.findById(order.id)
    expect(updatedOrder).toBeDefined()
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})
// it('acks a message', async()=>{
//     const {data,msg,listener} = await setup();
//     await listener.onMessage(data,msg)
//     expect(msg.ack).toHaveBeenCalled()
// })
