/* eslint-disable camelcase */
import { faker } from '@faker-js/faker';

export const createUserPayload = {
    email: faker.internet.email({ provider: 'test.com' }),
    name: faker.person.firstName(),
    gender: faker.person.sex(),
    status: 'active'
};

export const randomUserPayload = {
    email: faker.internet.email({ provider: 'sample.com' }),
    name: faker.person.firstName(),
    gender: faker.person.sex(),
    status: 'active'
};

export const updateUserPayload = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
};

export const validPostPayload = (id: number) => {
    return {
        user_id: id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph()
    };
};

export const invalidPostPayload = (id: number) => {
    return {
        user_id: id,
        title: faker.lorem.sentence()
    };
};