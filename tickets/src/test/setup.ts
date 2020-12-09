import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose  from 'mongoose';
import jwt from 'jsonwebtoken'


let mongo:any

declare global{
    namespace NodeJS{
        interface Global{
            getAuthCookie(): string[]
        }
    }

}
jest.mock('../nats-wrapper');
beforeAll(async()=>{ //run before test
    jest.clearAllMocks();
    process.env.JWT_KEY = "GREGTET"
    mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri() //uri to this memory server
    await mongoose.connect(mongoUri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
})

beforeEach(async()=>{
    //reset all data
   const collections = await mongoose.connection.db.collections() // all db connections
    for(let collection of collections){
        await collection.deleteMany({});
    }
})

afterAll(async()=>{
    //stop memory server when alltest  done
    await mongo.stop();
    await mongoose.connection.close()
})

global.getAuthCookie = ()=>{
    const payload={
        id: new mongoose.Types.ObjectId().toHexString(),
        email:'test@test.com'
    }
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = {jwt:token};
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64')
    return [`express:sess=${base64}`] //super test expect it
}