import request from 'supertest';
import {app} from '../../app'


//describe test
it('fails when non existing email is ',async()=>{
    return request(app)
    .post('/api/users/signin')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(400) // assertion
})

//describe test
it('fails when incorrect password is supplied ',async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(201) // assertion

    await request(app)
    .post('/api/users/signin')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing1234"
    })
    .expect(400) // assertion
})

//describe test
it('successful signin and cookie was set ',async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(201) // assertion

    const response = await request(app)
    .post('/api/users/signin')
    .send({ //body
        email:"noor882@yahifg.com",
        password:"testing123"
    })
    .expect(201) // assertion

    expect(response.get('Set-Cookie')).toBeDefined()
})