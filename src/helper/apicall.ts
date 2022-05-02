import { request } from "src/config/supertest";
import { endpoint } from "src/services/endpoints";
import { Response } from "supertest";

export const postCall = async (service: endpoint, payload: object): Promise<Response> => {
    return request.post(service).send(payload);
}

export const getCall = async (service: endpoint, payload?: object): Promise<Response> => {
    if (payload) return request.get(service).send(payload);
    else return request.get(service);
}