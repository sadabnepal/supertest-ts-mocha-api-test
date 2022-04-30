import faker from "@faker-js/faker";

export const createUserPayload = {
    "name": faker.name.firstName(),
    "job": faker.name.jobTitle()
}