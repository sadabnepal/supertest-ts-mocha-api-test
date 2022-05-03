import { request } from "src/config/supertest";
import { endpoint } from "src/services/endpoints";
import { Response } from "supertest";

export const postCall = async (service: endpoint, payload: object, headers?: object): Promise<Response> => {
    if (headers) return request.post(service).set(headers);
    return request.post(service).send(payload);
}

export const getCall = async (service: endpoint, payload?: object, headers?: object): Promise<Response> => {
    if (payload && headers) return request.get(service).set(headers).send(payload);
    else if (payload) return request.get(service).send(payload);
    else return request.get(service);
}