import { request } from "@Config/supertest";
import { logResponseToReport } from "@Helper/logger";
import { GetApiType, PostApiType } from "@Types/http";
import { Response } from "supertest";

export const httpPostCall = async (post: PostApiType): Promise<Response> => {
    let response = await request.post(post.service).set(post.headers ? post.headers : {}).send(post.payload);
    logResponseToReport(post.context, response);
    return response;
}

export const httpGetCall = async (get: GetApiType): Promise<Response> => {
    let response = await request.get(get.service).set(get.headers ? get.headers : {}).send(get.payload ? get.payload : {});
    logResponseToReport(get.context, response);
    return response;
}