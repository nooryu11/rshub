import express, {Request,Response} from 'express';
import {body} from 'express-validator'
import jwt from 'jsonwebtoken'

import {User} from '../models/user'
import {BadRequestError,validateRequest} from '@rshub/common';
import { Password } from '../helper/password';

const router = express.Router()

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Must provide a password')
    ],validateRequest,
    async (req:Request,res:Response)=>{
        const {email,password} = req.body;

        const existingUser = await User.findOne({email})
        if(!existingUser) throw new BadRequestError('Invalid credential')

        const passwordMatch = await Password.compare(existingUser.password,password)
        if(!passwordMatch) throw new BadRequestError('Invalid credential')
        //generate json web token; 
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },process.env.JWT_KEY!)
        //store it on the session object
        req.session = {jwt: userJwt}//type script doesnt want to assume that req.session.jwt already exists
        res.status(201).send(existingUser)
    })

export {router as signinRouter}
