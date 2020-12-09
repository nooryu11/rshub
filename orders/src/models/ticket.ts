import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface TicketAttrs {
  title: string;
  price: number;
  _id: string
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version:number;
  isReserved(): Promise<boolean>;
}


const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
ticketSchema.set('versionKey','version') //track version using name version instead of __V
ticketSchema.plugin(updateIfCurrentPlugin);//use this plugin for optimistic concurrency issue
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};
const ticketModel = mongoose.model<TicketDoc>('Ticket',ticketSchema)

class Ticket extends ticketModel{
    constructor(attr:TicketAttrs){
        super(attr)
        Object.setPrototypeOf(this,Ticket.prototype)
    }
}

export { Ticket };
