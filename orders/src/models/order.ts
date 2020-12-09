import mongoose from 'mongoose';
import {OrderStatus} from '@rshub/common'
import {TicketDoc} from './ticket'
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';
export { OrderStatus };
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number //so typsescript doesnt complain
}


const orderSchema = new mongoose.Schema(
  {
    userId: {
      type:String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus) //although inferface is enough but schema can also check
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
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

orderSchema.set('versionKey','version') //track version using name version instead of __V
orderSchema.plugin(updateIfCurrentPlugin);//use this plugin for optimistic concurrency issue
const orderModel = mongoose.model<OrderDoc>('Order',orderSchema)

class Order extends orderModel{
    constructor(attr:OrderAttrs){
        super(attr)
        Object.setPrototypeOf(this,Order.prototype)
    }
}
export { Order };
