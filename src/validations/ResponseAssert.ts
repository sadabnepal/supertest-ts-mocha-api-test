import { performanceTime } from '@Helper/utils';
import { expect, use } from 'chai';
import { Response } from 'supertest';
use(require('chai-json-schema'));

export default class ResponseAssert {

    constructor(public response: Response) {
        this.response = response;
    }

    timeIsLessThan(start: any, expectedTime: number) {
        expect(performanceTime() - start).to.be.lessThan(expectedTime);
        return this;
    }

    statusCodeIs(code: number) {
        expect(this.response.status).to.equal(code);
        return this;
    }

    typeIs(type: string) {
        expect(this.response.type).to.equal(type);
        return this;
    }

    schemaIs(schema: {}) {
        expect(this.response.body).to.be.jsonSchema(schema);
        return this;
    }

    toEqual(expected: string | number, actual: string | number) {
        expect(expected).equal(actual);
        return this;
    }

    isNotEmpty(value: string | number) {
        expect(value).is.not.empty;
        return this;
    }

}