import { expect } from 'chai';
import { createUserPayload } from 'src/resources/payload';
import supertest from 'supertest';

const request = supertest("https://reqres.in/api/");

describe('Test ReqRes APIs', () => {

    it('TC_001_should validate create users', async () => {

        const response = await request.post('users').send(createUserPayload);
        expect(response.statusCode).to.equal(201);
        console.log(JSON.stringify(response.body));
    })

})