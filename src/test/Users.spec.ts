import { postCall } from '@Helper/apicall';
import { checkResponseSchema } from '@Helper/schemavalidator';
import users from "@Resources/testdata.json";
import Userschema from '@Resources/userschema.json';
import { endpoint } from '@Services/endpoints';
import { UserPayloadType, UserResponseType } from '@Types/user';
import { expect } from 'chai';
import { performance } from 'perf_hooks';

describe('Test ReqRes APIs', () => {

    users.forEach((user: UserPayloadType) => {
        it(`should validate create user ${user.name}`, async () => {
            const startTime = performance.now();
            const response = await postCall(endpoint.user, user);

            expect(performance.now() - startTime).to.be.lessThan(2000);
            expect(response.statusCode).to.equal(201);
            expect(response.type).to.equal("application/json");

            checkResponseSchema(response, Userschema);

            const responseBody: UserResponseType = response.body;
            const { name, job, id, createdAt } = responseBody;
            expect(name).equal(user.name);
            expect(job).equal(user.job);
            expect(id).is.not.empty;
            expect(createdAt).is.not.empty;
        })
    })

})