import { logRequestToReport, logResponseToReport } from '@Helper/logger';
import type { DeleteApiType, GetApiType, PostApiType, PutApiType } from '@Types/http';
import supertest, { Response } from 'supertest';

export const httpGetRequest = async (options: GetApiType): Promise<Response> => {
    const response = await supertest(options.baseUrl)
        .get(options.endpoint)
        .query(options.query || {})
        .set(options.headers || {});
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpPostRequest = async (options: PostApiType): Promise<Response> => {
    if (options.context) logRequestToReport(options.context, options.payload);
    const response = await supertest(options.baseUrl)
        .post(options.endpoint)
        .set(options.headers || {})
        .send(options.payload);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpPuCall = async (options: PutApiType): Promise<Response> => {
    if (options.context) logRequestToReport(options.context, options.payload);
    const response = await supertest(options.baseUrl)
        .put(options.endpoint)
        .set(options.headers || {})
        .send(options.payload);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpDeleteCall = async (options: DeleteApiType): Promise<Response> => {
    const response = await supertest(options.baseUrl)
        .delete(options.endpoint)
        .set(options.headers || {});
    if (options.context) logResponseToReport(options.context, response);
    return response;
};
