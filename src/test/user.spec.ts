import { GO_RES_BASEURL } from '@ENV/manager';
import { httpDeleteCall, httpGetRequest, httpPostRequest, httpPuCall } from '@Helper/httpCalls';
import { GO_REST_TOKEN } from '@Helper/miscellaneous';
import { createUserPayload, updateUserPayload } from '@Resources/faker';
import userSchema from '@Schema/user.json';
import { endpoint } from '@Services/endpoints';
import { Person } from '@Types/user';
import { expect, use } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
use(require('chai-json-schema'));

describe('Test go rest /USERS', function () {

    let userID: number;

    it('should validate create users', async function () {
        const response = await httpPostRequest({
            baseUrl: GO_RES_BASEURL,
            endpoint: endpoint.users,
            payload: createUserPayload,
            headers: GO_REST_TOKEN,
            context: this
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.code).to.equal(201);
        expect(response.body.data).to.be.jsonSchema(userSchema);

        const { name, email, gender, status, id } = response.body.data;

        expect(id).to.be.a('number');
        expect(name).to.equal(createUserPayload.name);
        expect(email).to.equal(createUserPayload.email);
        expect(gender).to.equal(createUserPayload.gender.toLowerCase());
        expect(status).to.equal(createUserPayload.status.toLowerCase());
        userID = id;
    });

    it('should validate get users', async function () {
        const response = await httpGetRequest({
            baseUrl: GO_RES_BASEURL,
            endpoint: endpoint.users,
            headers: GO_REST_TOKEN,
            context: this
        });

        expect(response.body.code).to.equal(200);
        expect(response.body.data).to.not.be.empty;
    });

    it('should validate get users by id', async function () {
        const response = await httpGetRequest({
            baseUrl: GO_RES_BASEURL,
            endpoint: `${endpoint.users}/${userID}`,
            headers: GO_REST_TOKEN,
            context: this
        });

        expect(response.body.code).to.equal(200);
        expect(response.body.data.id).to.equal(userID);
    });

    it('should validate get users with query parameter', async function () {
        const userQueryParams = {
            'page': 5,
            'gender': 'male',
            'status': 'active'
        };

        const response = await httpGetRequest({
            baseUrl: GO_RES_BASEURL,
            endpoint: endpoint.users,
            query: userQueryParams,
            headers: GO_REST_TOKEN,
            context: this
        });

        expect(response.body.code).to.equal(200);

        response.body.data.forEach((person: Person) => {
            expect(person.id).to.satisfy(Number.isInteger);
            expect(person.gender).to.equal(userQueryParams.gender);
            expect(person.status).to.equal(userQueryParams.status);
        });
    });

    it('should validate update user by id', async function () {
        const response = await httpPuCall({
            baseUrl: GO_RES_BASEURL,
            endpoint: `${endpoint.users}/${userID}`,
            payload: updateUserPayload,
            headers: GO_REST_TOKEN,
            context: this
        });

        expect(response.body.code).to.equal(200);
        expect(response.body.data.name).to.equal(updateUserPayload.name);
        expect(response.body.data.email).to.equal(updateUserPayload.email);
    });

    it('should validate delete user by id', async function () {
        const response = await httpDeleteCall({
            baseUrl: GO_RES_BASEURL,
            endpoint: `/users/${userID}`,
            headers: GO_REST_TOKEN,
            context: this
        });

        expect(response.body.code).to.equal(204);
        expect(response.body.data).to.equal(null);
    });

});