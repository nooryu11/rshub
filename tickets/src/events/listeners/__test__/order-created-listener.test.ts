import {OrderCreatedListener} from '../order-created-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose'
import {OrderCreatedEvent, OrderStatus} from '@rshub/common'
import {Message} from 'node-nats-streaming'
import {Ticket} from '../../../models/ticket'
const setup = async()=>{
    const listener = new OrderCreatedListener(natsWrapper.client)

    var ticket = new Ticket({
        title:"airline",
        price:15,
        userId: "noor22"
    })
   await ticket.save()

   const data: OrderCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: "ffff",
    userId: "noor11",
    ticket:{
        id:ticket.id,
        price: ticket.price
    }
}
    //@ts-ignore
    const msg: Message ={
        ack: jest.fn()
    }
    return {listener,data,msg}
}
it('find and update ticket with its orderId', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    const updatedTicket = await Ticket.findById(data.ticket.id)
    console.log("888",updatedTicket)
    expect(updatedTicket).toBeDefined()
    expect(updatedTicket!.orderId).toEqual(data.id)
})
it('acks a message', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    expect(msg.ack).toHaveBeenCalled()
})
it('re publishes an ticket update event ', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    expect(natsWrapper.client.publish).toHaveBeenCalled()
    //@ts-ignore
    console.log((natsWrapper.client.publish as jest.Mock).mock.calls) //to know if published the correct event 

    // extract json from above to make sure data published is correct
})