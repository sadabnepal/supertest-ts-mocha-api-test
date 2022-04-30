import { validate } from "jsonschema";
import { Response } from "supertest";

/**
 * Custom implementation of json schema validation that return true or throw filtered meaningful error
 */
export const checkResponseSchema = (response: Response, schema: object): boolean => {
    let responseResult = validate(response.body, schema).valid;
    if (responseResult) return responseResult;
    else {
        let errorMessages = validate(response.body, schema).errors.filter((error: { message: string }) => error.message);
        throw Error(`Failed to validate schema:  ${errorMessages}`)
    }
}