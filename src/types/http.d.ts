import { endpoint } from "@Services/endpoints";

type ApiOptions = {
    service: endpoint,
    query?: object,
    headers?: Record<string, string>
    context?: Mocha.Context
};

export type GetApiType = ApiOptions;

export type PostApiType = ApiOptions & { payload: object };