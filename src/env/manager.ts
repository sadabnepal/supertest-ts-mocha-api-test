import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), 'src', 'env', `${process.env.ENV || 'dev'}.env`) });

export const REQ_RES_BASEURL = process.env.REQ_RES_BASEURL as string;
export const GO_RES_BASEURL = process.env.GO_RES_BASEURL as string;