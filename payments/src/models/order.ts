import mongoose from 'mongoose';
import {OrderStatus} from '@rshub/common'
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

interface OrderAttrs {
  _id: string;
  userId:string;
  version:number
  status: OrderStatus;
  price:number

}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  price:  number;
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
    price: {
      type: Number,
      required:true
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
