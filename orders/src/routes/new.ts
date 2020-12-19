import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from '@rshub/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';
const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    
    const ticket = await Ticket.findById(ticketId);
    console.log("ttt",ticket)
    if (!ticket) {
      console.log("tgtt",ticketId)
      throw new BadRequestError('Ticket not found');
      console.log("ttt",ticketId)
      throw new NotFoundError();
    }

    // Make sure that this ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }

    // Calculate an expiration date for this order
      var expiration = new Date()
      expiration.setSeconds(expiration.getSeconds() + 1 * 60)
    // Build the order and save it to the database
    const order= new Order({
      userId: req.currentUser!.id,
      status :OrderStatus.Created,
      ticket:ticket,
      expiresAt: expiration
    })
    await order.save()
    // Publish an event saying that an order was created
   await  new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id!,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      version: order.version,
      ticket: {
        id: ticket.id!,
        price: ticket.price,
      },
    });
    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
