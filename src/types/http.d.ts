import { endpoint } from "@Services/endpoints";

export type PostApiType = {
    service: endpoint,
    payload: object,
    headers?: object,
    context: Mocha.Context,
}

export type GetApiType = {
    service: endpoint,
    payload?: object,
    headers?: object,
    context: Mocha.Context
}