import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signupRouter} from './routes/signup';
import {signoutRouter} from './routes/signout';
import {errorHandler} from '@rshub/common';
import {NotFoundError} from '@rshub/common';

const app = express();
app.set('trust proxy',true)//express see proxied, by default express gona say I dont really trust this https connection, it will trust it as secure even thought it is coming from proxy
app.use(json());
app.use(cookieSession({
    signed:false,//jwt is already encrypted,no need to make cookie encrypted
    secure:false//cookies will only be used if user is visiting out app over https.// jest supertest doesnt make https call
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*',async(req,res)=>{
  throw new NotFoundError()
})
app.use(errorHandler)
export {app};
