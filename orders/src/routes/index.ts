import express, { Request, Response } from 'express';
import { requireAuth } from '@rshub/common';
import { Order } from '../models/order';

var app = require('express')();
const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');
  io.on('connection', function(socket:any) {
    socket.emit('announcements', { message: 'A new user has joined!' });
});
  res.send(orders);
});

export { router as indexOrderRouter };
