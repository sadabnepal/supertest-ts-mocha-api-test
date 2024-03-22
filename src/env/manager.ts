import { config } from 'dotenv';
import { join } from 'path';
import supertest from 'supertest';

config({ path: join(process.cwd(), 'src', 'env', `${process.env.ENV || 'dev'}.env`) });

export const request = supertest(process.env.BASEURL);