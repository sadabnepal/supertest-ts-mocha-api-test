import addContext from 'mochawesome/addContext';
import supertest from "supertest";

const formatResponse = (response: supertest.Response) => {
    return `Response: ${JSON.stringify(response.body, null, 4)}`;
}

export const logResponseToReport = (context: Mocha.Context, response: supertest.Response) => {
    addContext(context, formatResponse(response))
}
