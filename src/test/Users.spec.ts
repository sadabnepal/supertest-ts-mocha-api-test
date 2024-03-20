import { httpPostCall } from '@Helper/httpCalls';
import { performanceTime } from '@Helper/utils';
import testData from "@Resources/testdata.json";
import userSchema from "@Schema/user.json";
import { endpoint } from '@Services/endpoints';
import { RESPONSE } from '@Static/constants';
import { UserPayloadType, UserResponseType } from '@Types/user';
import { expect, use } from 'chai';
use(require('chai-json-schema'));

describe('Test ReqRes APIs', () => {

    it('should validate create user 1', async function () {

        const userData: UserPayloadType = testData.user1;

        const startTime = performanceTime()
        const response = await httpPostCall({ service: endpoint.user, payload: userData, context: this });

        const { name, job, id, createdAt }: UserResponseType = response.body;

        expect(performanceTime() - startTime).to.be.lessThan(RESPONSE.TIME);
        expect(response.status).to.equal(RESPONSE.CODE);
        expect(response.type).to.equal(RESPONSE.TYPE);
        expect(response.body).to.be.jsonSchema(userSchema);
        expect(name).equal(userData.name);
        expect(job).equal(userData.job);
        expect(id).is.not.empty;
        expect(createdAt).is.not.empty;
    })

    it('should validate create user 2', async function () {

        const userData: UserPayloadType = testData.user2;

        const startTime = performanceTime()
        const response = await httpPostCall({ service: endpoint.user, payload: userData, context: this });

        const { name, job, id, createdAt }: UserResponseType = response.body;

        expect(performanceTime() - startTime).to.be.lessThan(RESPONSE.TIME);
        expect(response.status).to.equal(RESPONSE.CODE);
        expect(response.type).to.equal(RESPONSE.TYPE);
        expect(response.body).to.be.jsonSchema(userSchema);
        expect(name).equal(userData.name);
        expect(job).equal(userData.job);
        expect(id).is.not.empty;
        expect(createdAt).is.not.empty;
    })

})