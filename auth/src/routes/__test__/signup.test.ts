import request from 'supertest';
import {app} from '../../app'


//describe test
it('return 201 on successful signup',async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(201) // assertion
})

it("returns a 400 with invalid email",async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahi",
        password:"testing123"
    })
    .expect(400) // assertion
})

it("returns a 400 with invalid password",async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahi",
        password:"12"
    })
    .expect(400) // assertion
})
it("returns a 400 with missing email and password",async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({ //body
    })
    .expect(400) // assertion
})

it("dissallow dublicate email",async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(201); // assertion

    await request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(400) // assertion
})

it("making sure cookie header is set",async()=>{
    const res = await request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(201)
    expect(res.get('Set-Cookie')).toBeDefined()// assertion
})