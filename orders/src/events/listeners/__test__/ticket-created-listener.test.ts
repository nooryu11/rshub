import {TicketCreatedListener} from '../ticket-created-listener'
import {natsWrapper} from '../../../nats-wrapper';
import mongoose from 'mongoose'
import {TicketCreatedEvent} from '@rshub/common'
import {Message} from 'node-nats-streaming'
import {Ticket} from '../../../models/ticket'
const setup = async()=>{
    const listener = new TicketCreatedListener(natsWrapper.client)
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        price: 15,
        userId:new mongoose.Types.ObjectId().toHexString(),
        title: 'emiratas'
    }
    //@ts-ignore
    const msg: Message ={
        ack: jest.fn()
    }
    return {listener,data,msg}
}
it('it creates and saves a ticket', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    const ticket = await Ticket.findById(data.id)
    expect(ticket).toBeDefined()
    expect(ticket!.title).toEqual(data.title)
    expect(ticket!.price).toEqual(data.price)
})
it('axks a message', async()=>{
    const {data,msg,listener} = await setup();
    await listener.onMessage(data,msg)
    expect(msg.ack).toHaveBeenCalled()
})
