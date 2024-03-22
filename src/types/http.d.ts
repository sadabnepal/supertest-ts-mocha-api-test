import { endpoint } from '@Services/endpoints';

interface ApiOptions {
    endpoint: endpoint,
    headers?: Record<string, string>
    context?: Mocha.Context
}

export type GetApiType = ApiOptions & { query?: object };

export type PostApiType = ApiOptions & { payload: object };