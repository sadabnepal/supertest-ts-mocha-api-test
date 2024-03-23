import { GO_RES_BASEURL } from '@ENV/manager';
import { httpDeleteCall, httpGetRequest, httpPostRequest, httpPuCall } from '@Helper/httpCalls';
import { GO_REST_TOKEN } from '@Helper/miscellaneous';
import { createUserPayload, updateUserPayload } from '@Resources/faker';
import { endpoint } from '@Services/endpoints';
import { Person } from '@Types/user';
import { expect } from 'chai';

describe('Test go rest User APIs', function () {

    let userID: number;

    describe('POST tests', function () {

        it('should validate create users', async function () {
            const response = await httpPostRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.user,
                payload: createUserPayload,
                headers: GO_REST_TOKEN,
                context: this
            });

            expect(response.statusCode).to.equal(200);
            expect(response.body.code).to.equal(201);

            const responseData: Person = response.body.data;
            const { name, email, gender, status, id } = responseData;

            expect(name).to.equal(createUserPayload.name);
            expect(email).to.equal(createUserPayload.email);
            expect(gender).to.equal(createUserPayload.gender.toLowerCase());
            expect(status).to.equal(createUserPayload.status.toLowerCase());
            userID = id;
        });
    });

    describe('GET tests', () => {
        it('should validate /USERS', async function () {
            const response = await httpGetRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.user,
                headers: GO_REST_TOKEN,
                context: this
            });

            expect(response.body.data).to.not.be.empty;
        });

        it('should validate /USERS:id', async function () {
            const response = await httpGetRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: `${endpoint.user}/${userID}`,
                headers: GO_REST_TOKEN,
                context: this
            });

            expect(response.body.data.id).to.equal(userID);
        });

        it('should validate /USERS with query parameter', async function () {
            const userQueryParams = {
                'access-token': process.env.USER_TOKEN,
                'page': 5,
                'gender': 'male',
                'status': 'active'
            };

            const response = await httpGetRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.user,
                query: userQueryParams,
                context: this
            });

            expect(response.statusCode).to.equal(200);

            response.body.data.forEach((person: Person) => {
                expect(person.id).to.satisfy(Number.isInteger);
                expect(person.gender).to.equal('male');
                expect(person.status).to.equal('active');
            });
        });

    });

    describe('PUT tests', function () {
        it('should validate /users/id', async function () {
            const response = await httpPuCall({
                baseUrl: GO_RES_BASEURL,
                endpoint: `/users/${userID}`,
                payload: updateUserPayload,
                headers: GO_REST_TOKEN,
                context: this
            });

            expect(response.status).to.equal(200);
            expect(response.body.data.name).to.equal(updateUserPayload.name);
            expect(response.body.data.email).to.equal(updateUserPayload.email);
        });
    });

    describe('DELETE tests', function () {
        it('should validate /users/id', async function () {
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

});