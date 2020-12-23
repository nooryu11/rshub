import {TicketUpdatedListener} from '../ticket-updated-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose'
import {TicketUpdatedEvent} from '@rshub/common'
import {Message} from 'node-nats-streaming'
import {Ticket} from '../../../models/ticket'
const setup = async()=>{
    const listener = new TicketUpdatedListener(natsWrapper.client)

    var ticket = new Ticket({
        _id:new mongoose.Types.ObjectId().toHexString(),
        title:"airline",
        price:15
    })
   await ticket.save()

   const data: TicketUpdatedEvent['data'] = {
    version: ticket.version +1,
    id: ticket.id!,
    price: 999,
    userId:'ooo',
    title: 'emiratas - fly better- fly us'
}
    //@ts-ignore
    const msg: Message ={
        ack: jest.fn()
    }
    return {listener,data,msg}
}
it('find, update and saves a ticket', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    const updatedTicket = await Ticket.findById(data.id)
    expect(updatedTicket).toBeDefined()
    expect(updatedTicket!.title).toEqual(data.title)
    expect(updatedTicket!.version).toEqual(data.version)
})
it('axks a message', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    expect(msg.ack).toHaveBeenCalled()
})

it('it rejects the out of sync event', async()=>{
    const {data,msg,listener} = await setup();
    data.version = 9;
    try{
        await listener.onMessage(data,msg) //because it throws an error message on fail, if this is not put in the try and catch statemnet, the whole test case will throw an error
    }
    catch{}
    expect(msg.ack).not.toHaveBeenCalled()
    // expect(msg.ack).toHaveBeenCalled()
})