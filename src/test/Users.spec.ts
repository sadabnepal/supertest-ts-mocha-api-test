import { expect } from 'chai';
import { request } from 'src/config/supertest';
import userdata from "src/resources/testdata.json";

type User = { name: string, job: string };

describe('Test ReqRes APIs', () => {

    userdata.forEach((user: User) => {
        it(`should validate create user ${user.name}`, async () => {
            const response = await request.post('users').send(user);
            expect(response.statusCode).to.equal(201);
        })
    })

})