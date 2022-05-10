import supertest from 'supertest';

export const request = supertest(process.env.BASEURI || "https://reqres.in/api/");