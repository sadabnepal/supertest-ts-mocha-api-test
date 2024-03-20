import { request } from "@Config/supertest";
import { logRequestToReport, logResponseToReport } from "@Helper/logger";
import { GetApiType, PostApiType } from "@Types/http";
import { Response } from "supertest";

export const httpGetCall = async (options: GetApiType): Promise<Response> => {
    let response = await request
        .get(options.service)
        .query(options.query || {})
        .set(options.headers || {})
    if (options.context) logResponseToReport(options.context, response);
    return response;
}

export const httpPostCall = async (options: PostApiType): Promise<Response> => {
    if (options.context) logRequestToReport(options.context, options.payload)
    let response = await request
        .post(options.service)
        .query(options.query || {})
        .set(options.headers || {})
        .send(options.payload);
    if (options.context) logResponseToReport(options.context, response);
    return response;
}