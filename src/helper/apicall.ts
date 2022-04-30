import { request } from "src/config/supertest";
import { endpoint } from "src/services/endpoints";
import { Response } from "supertest";

export const postCall = async (endpoint: endpoint, payload: object): Promise<Response> => {
    return await request.post(endpoint).send(payload);
}

export const getCall = async (endpoint: endpoint, payload?: object): Promise<Response> => {
    if (payload) return await request.get(endpoint).send(payload);
    else return await request.get(endpoint);
}