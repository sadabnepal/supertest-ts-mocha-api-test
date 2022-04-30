import { expect } from 'chai';
import { validate } from "jsonschema";
import { performance } from 'perf_hooks';
import { postCall } from 'src/helper/apicall';
import users from "src/resources/testdata.json";
import Userschema from 'src/resources/userschema.json';
import { endpoint } from 'src/services/endpoints';
import { UserPayloadType, UserResponseType } from 'src/types/user';

describe('Test ReqRes APIs', () => {

    users.forEach((user: UserPayloadType) => {
        it(`should validate create user ${user.name}`, async () => {
            const startTime = performance.now();
            const response = await postCall(endpoint.user, user);

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