import {app} from './app'
import mongoose from 'mongoose'
const start = async () => {
  console.log("starting the Auth microservice")
  if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY is missing")
  }
  if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is missing")
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log("connected to mongodb")
  } catch (error) {
    console.log(error)
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!! for auth service');
  });
}
start();
