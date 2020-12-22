const express = require('express')
const expressGraphQL = require('express-graphql');
const schema = require('../graphql');
const { json } = require('body-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const { errorHandler, NotFoundError, currentUser } = require('@rshub/common')

// import { deleteOrderRouter } from './routes/delete';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(currentUser);

app.use('/customer', expressGraphQL({
  schema,
  graphiql: true
}))
// app.use(deleteOrderRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

module.exports= { app };
