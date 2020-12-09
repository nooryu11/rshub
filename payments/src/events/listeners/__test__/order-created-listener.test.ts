import {OrderCreatedListener} from '../order-created-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose'
import {OrderCreatedEvent, OrderStatus} from '@rshub/common'
import {Message} from 'node-nats-streaming'
import { Order } from '../../../models/order';
const setup = async()=>{
    const listener = new OrderCreatedListener(natsWrapper.client)


   const data: OrderCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: "ffff",
    userId: "noor11",
    ticket:{
        id:"fweee",
        price: 15
    }
}
    //@ts-ignore
    const msg: Message ={
        ack: jest.fn()
    }
    return {listener,data,msg}
}
it('create a order', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    const order = await Order.findById(data.id)
    expect(order).toBeDefined()
    expect(order!.price).toEqual(data.ticket.price)
})
it('acks a message', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    expect(msg.ack).toHaveBeenCalled()
})
