import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import client from '../redis-client'
import {promisify} from 'util'

const router = express.Router();

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)
router.get('/api/tickets', async (req: Request, res: Response) => {
  var cachedTickets = await GET_ASYNC('tickets')
  if(cachedTickets){
    res.send(JSON.parse(cachedTickets))
    return
  }
  const tickets = await Ticket.find({
    orderId:undefined
  });
  const result = await SET_ASYNC('tickets',JSON.stringify(tickets),'EX',5)
console.log("cached the da!ta",result)
  res.send(tickets);
});

export { router as indexTicketRouter };
