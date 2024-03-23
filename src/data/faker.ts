/* eslint-disable camelcase */
import { faker } from '@faker-js/faker';

export const createUserPayload = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: 'male',
    status: 'active'
};

export const randomUserPayload = {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    gender: 'male',
    status: 'active'
};

export const updateUserPayload = {
    name: faker.name.firstName(),
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