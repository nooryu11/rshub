import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
  NotAuthorizedError,
} from '@rshub/common';
import { body } from 'express-validator';
import {stripe} from '../stripe'
import {Order} from '../models/order'
import {Payment} from '../models/payment'
import {PaymentCreatedPublisher} from '../events/publishers/payment-created-publisher'
import {natsWrapper} from '../nats-wrapper'
const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [
    body('token')
      .not()
      .isEmpty(),body('orderId')
      .not()
      .isEmpty()
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const {token,orderId} = req.body
    //find the order
    const order = await Order.findById(orderId)
    if(!order)  throw new NotFoundError() 

   //if this user is the one who actually logged in and buying
   if(order.userId !== req.currentUser?.id) throw new NotAuthorizedError();

   //if order is cancelled
   if(order.status === OrderStatus.Cancelled) throw new BadRequestError('Order is cancelled; cannot process payments');

   var charge = await stripe.charges.create({
     currency:'usd',
     amount: order.price * 100,
     source:token, 
   })
   const payment =  new Payment({
     stripeId: charge.id,
     orderId:order.id
   })
   await payment.save()
   await new PaymentCreatedPublisher(natsWrapper.client).publish({
     id:payment.id,
     stripeId: payment.stripeId,
     orderId: payment.orderId
   })
    res.status(201).send({success:charge,paymentId:payment.id});
  }
);

export { router as createChargeRouter };
