import mongoose from 'mongoose';
import { Password } from '../helper/password';

interface UserAttrs{
    email: string,
    password: string
}
interface UserDoc extends mongoose.Document{
    email:string,
    password:string
}

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){ //mongoose user doc , thing that turned into json. Allow to modify doc when mongodb return object from db upon save or update or delete whatever. Not recommened often; user other prper way
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})
userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'))
        this.set('password',hashed)
    }
    done();
})
const UserModel = mongoose.model<UserDoc>('User',userSchema)

class User extends UserModel{
    constructor(attr:UserAttrs){
        super(attr)
        Object.setPrototypeOf(this,User.prototype)
    }
    build(){
        return "hi"
    }
}



export {User};