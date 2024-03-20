import addContext from 'mochawesome/addContext';
import { Response } from "supertest";

export const logRequestToReport = (context: Mocha.Context, request: object) => {
    addContext(context, `Request Payload: ${JSON.stringify(request, null, 4)}`)
}


export const logResponseToReport = (context: Mocha.Context, response: Response) => {
    addContext(context, `Response: ${JSON.stringify(response.body, null, 4)}`)
}
