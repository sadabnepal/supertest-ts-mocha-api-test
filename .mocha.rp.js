/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');
const { join } = require('path');

config({ path: join(process.cwd(), '.env') });

module.exports = {
    spec: ['src/test/**/*.ts'],
    package: './package.json',
    extension: ['ts', 'js'],
    timeout: 5 * 1000,
    color: true,
    grep: '',
    ignore: [''],
    reporter: '@reportportal/agent-js-mocha',
    'reporter-option': [
        `apiKey= ${process.env.REPORT_PORTAL_KEY}`,
        'endpoint=http://localhost:8080/api/v1',
        'launch=supertest-ts-mocha-api-test',
        `project=${process.env.REPORT_PORTAL_PROJECT}`,
        'description=supertest mocha api test reports',
        `attributes=[{"env":"${process.env.ENV}"}, smoke, integration]`,
    ],
    require: ['ts-node/register, tsconfig-paths/register'],
    parallel: false,
    recursive: false,
    retries: 0,
    slow: '75',
    sort: false,
    ui: 'bdd'
};