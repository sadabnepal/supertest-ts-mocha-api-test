import { endpoint } from '@Services/endpoints';

interface ApiOptions {
    baseUrl: string,
    endpoint: endpoint | string,
    headers: Record<string, string>
    context?: Mocha.Context
}

export type GetApiType = ApiOptions & { query?: object };

export type PostApiType = ApiOptions & { payload: object };

export type PutApiType = ApiOptions & { payload: object }

export type DeleteApiType = ApiOptions;
