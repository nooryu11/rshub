import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose  from 'mongoose';
import request from 'supertest'
import {app} from '../app';

let mongo:any

declare global{
    namespace NodeJS{
        interface Global{
            getAuthCookie(): Promise<string[]>
        }
    }

}
beforeAll(async()=>{ //run before test
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

global.getAuthCookie =  async ()=>{
    const email = "test@testing.com"
    const password = "pssword"
    const response = await request(app)
    .post('/api/users/signup')
    .send({ //body
        email,
        password:password
    })
    .expect(201) // assertion
    const cookie = response.get('Set-Cookie')
    return cookie;
}