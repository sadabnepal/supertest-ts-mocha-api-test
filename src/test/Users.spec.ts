import { expect } from 'chai';
import { validate } from "jsonschema";
import { performance } from 'perf_hooks';
import { request } from 'src/config/supertest';
import users from "src/resources/testdata.json";
import Userschema from 'src/resources/userschema.json';

type User = { name: string, job: string };

describe('Test ReqRes APIs', () => {

    users.forEach((user: User) => {
        it(`should validate create user ${user.name}`, async () => {
            const startTime = performance.now();
            const response = await request.post('users').send(user);
            expect(performance.now() - startTime, "Response time exceeded").to.be.lessThan(2000);
            expect(response.statusCode).to.equal(201);
            expect(response.type).to.equal("application/json");
            expect(validate(response.body, Userschema).valid).to.be.true;
            expect(validate(response.body, Userschema).errors.length).to.equal(0);
        })
    })

})