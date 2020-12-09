import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@rshub/common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
console.log("888",order)
    // publishing an event saying this was cancelled!
   await  new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    res.status(201).send(order);
  }
);

export { router as deleteOrderRouter };
