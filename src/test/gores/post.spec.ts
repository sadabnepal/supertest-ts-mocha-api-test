import { GO_RES_BASEURL } from '@ENV/manager';
import { httpGetRequest, httpPostRequest } from '@Helper/httpCalls';
import { GO_REST_TOKEN } from '@Helper/miscellaneous';
import { invalidPostPayload, randomUserPayload, validPostPayload } from '@Resources/faker';
import { endpoint } from '@Services/endpoints';
import { expect } from 'chai';

describe('Test go rest posts APIs', function () {

    let userID: number;

    before('setup user id', async function () {
        const response = await httpPostRequest({
            baseUrl: GO_RES_BASEURL,
            endpoint: endpoint.user,
            payload: randomUserPayload,
            headers: GO_REST_TOKEN
        });
        userID = response.body.data.id;
    });

    describe('happy path', function () {
        let postID: number;
        it('should validate /POSTS', async function () {
            const response = await httpPostRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.posts,
                payload: validPostPayload(userID),
                headers: GO_REST_TOKEN,
                context: this
            });

            postID = response.body.data.id;
            expect(response.body.code).to.be.eq(201);
        });

        it('should validate /POSTS/:id', async function () {
            const response = await httpGetRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: `${endpoint.posts}/${postID}`,
                context: this
            });

            expect(response.statusCode).to.equal(200);
        });
    });

    describe('negative scenarios', function () {

        it('should validate 401 Error code', async function () {
            const response = await httpPostRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.posts,
                payload: validPostPayload(userID),
                headers: {},
                context: this
            });

            expect(response.body.code).to.be.eq(401);
            expect(response.body.data.message).to.be.eq('Authentication failed');
        });

        it('should validate 401 Error code with invalid token', async function () {
            const response = await httpPostRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.posts,
                payload: validPostPayload(userID),
                headers: { 'Authorization': `Bearer INVALID TOKEN` },
                context: this

            });

            expect(response.body.code).to.be.eq(401);
            expect(response.body.data.message).to.be.eq('Invalid token');
        });

        it('should validate 422 Error code', async function () {
            const response = await httpPostRequest({
                baseUrl: GO_RES_BASEURL,
                endpoint: endpoint.posts,
                payload: invalidPostPayload(userID),
                headers: GO_REST_TOKEN,
                context: this
            });

            expect(response.body.code).to.be.eq(422);
            expect(response.body.data[0].message).to.be.eq("can't be blank");
        });

    });
});