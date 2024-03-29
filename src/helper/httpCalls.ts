import { logRequestToReport, logResponseToReport } from '@Helper/logger';
import type { DeleteApiType, GetApiType, PostApiType, PutApiType } from '@Types/http';
import { expect } from 'chai';
import supertest from 'supertest';
import { performanceTime } from './miscellaneous';

export const httpGetRequest = async (options: GetApiType): Promise<supertest.Response> => {
    const startTime = performanceTime();
    const response = await supertest(options.baseUrl)
        .get(options.endpoint)
        .query(options.query || {})
        .set(options.headers || {});
    expect(performanceTime() - startTime).to.be.lessThan(1000);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpPostRequest = async (options: PostApiType): Promise<supertest.Response> => {
    if (options.context) logRequestToReport(options.context, options.payload);
    const startTime = performanceTime();
    const response = await supertest(options.baseUrl)
        .post(options.endpoint)
        .set(options.headers || {})
        .send(options.payload);
    expect(performanceTime() - startTime).to.be.lessThan(1000);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpPuCall = async (options: PutApiType): Promise<supertest.Response> => {
    if (options.context) logRequestToReport(options.context, options.payload);
    const startTime = performanceTime();
    const response = await supertest(options.baseUrl)
        .put(options.endpoint)
        .set(options.headers || {})
        .send(options.payload);
    expect(performanceTime() - startTime).to.be.lessThan(1000);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};

export const httpDeleteCall = async (options: DeleteApiType): Promise<supertest.Response> => {
    const startTime = performanceTime();
    const response = await supertest(options.baseUrl)
        .delete(options.endpoint)
        .set(options.headers || {});
    expect(performanceTime() - startTime).to.be.lessThan(1000);
    if (options.context) logResponseToReport(options.context, response);
    return response;
};
