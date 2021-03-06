import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundError,currentUser} from '@rshub/common';
import responseTime from 'response-time'
import {createTicketRouter} from './routes/new'
import {showTicketRouter} from './routes/show'
import {indexTicketRouter} from './routes/index'
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy',true)//express see proxied, by default express gona say I dont really trust this https connection, it will trust it as secure even thought it is coming from proxy
app.use(json());
app.use(responseTime())
app.use(cookieSession({
    signed:false,//jwt is already encrypted,no need to make cookie encrypted
    secure:process.env.NODE_ENV !== "test" //cookies will only be used if user is visiting out app over https.// jest supertest doesnt make https call
}))
app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.all('*',async(req,res)=>{
  throw new NotFoundError()
})
app.use(errorHandler)
export {app};
