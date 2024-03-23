import { config } from 'dotenv';
import { join } from 'path';
import { performance } from 'perf_hooks';

export const performanceTime = () => performance.now();

config({ path: join(process.cwd(), '.env') });

export const GO_REST_TOKEN = { 'Authorization': `Bearer ${process.env.USER_TOKEN}` };