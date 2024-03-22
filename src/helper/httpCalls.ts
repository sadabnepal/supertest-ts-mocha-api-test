import { request } from '@ENV/manager';
import { logRequestToReport, logResponseToReport } from '@Helper/logger';
import type { GetApiType, PostApiType } from '@Types/http';
import type { Response } from 'supertest';

export const httpGetCall = async (options: GetApiType): Promise<Response> => {
    const response = await request
        .get(options.endpoint)
        .query(options.query || {})
        .set(options.headers || {});
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpPostCall = async (options: PostApiType): Promise<Response> => {
    if (options.context) logRequestToReport(options.context, options.payload);
    const response = await request
        .post(options.endpoint)
        .set(options.headers || {})
        .send(options.payload);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};
