import { endpoint } from "@Services/endpoints";

type ApiOptions = {
    service: endpoint,
    headers?: object,
    context?: Mocha.Context
};

export type GetApiType = ApiOptions;

export type PostApiType = ApiOptions & { payload: object };