import mongoose from 'mongoose';
import  {updateIfCurrentPlugin} from 'mongoose-update-if-current'
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
  }
  
  interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
    version:number;
    orderId?: string
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
      },
      userId: {
        type: String,
        required: true,
      },
      orderId:{
        type: String
      }
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
const ticketModel = mongoose.model<TicketDoc>('Ticket',ticketSchema)

class Ticket extends ticketModel{
    constructor(attr:TicketAttrs){
        super(attr)
        Object.setPrototypeOf(this,Ticket.prototype)
    }
}



export {Ticket};