import { expect } from 'chai';
import { validate } from "jsonschema";
import { performance } from 'perf_hooks';
import { request } from 'src/config/supertest';
import users from "src/resources/testdata.json";
import Userschema from 'src/resources/userschema.json';
import { UserPayloadType, UserResponseType } from 'src/types/user';

describe('Test ReqRes APIs', () => {

    users.forEach((user: UserPayloadType) => {
        it(`should validate create user ${user.name}`, async () => {
            const startTime = performance.now();
            const response = await request.post('users').send(user);

            expect(performance.now() - startTime).to.be.lessThan(2000);
            expect(response.statusCode).to.equal(201);
            expect(response.type).to.equal("application/json");

            const responseBody: UserResponseType = response.body
            expect(validate(responseBody, Userschema).valid).to.be.true;
            expect(validate(responseBody, Userschema).errors.length).to.equal(0);

            const { name, job, id, createdAt } = responseBody;
            expect(name).equal(user.name);
            expect(job).equal(user.job);
            expect(id).not.empty;
            expect(createdAt).not.empty;
        })
    })

})