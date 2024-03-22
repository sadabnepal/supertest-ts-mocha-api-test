module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.js'
            ]
        }
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '.js',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'semi': [
            'error',
            'always',
            {
                omitLastInOneLineBlock: true,
                omitLastInOneLineClassBody: true,

            }
        ],
        'getter-return': ['error'],
        'no-fallthrough': [
            'error',
            {
                allowEmptyCase: true
            }
        ],
        'no-irregular-whitespace': [
            'error',
            {
                skipStrings: true,
                skipComments: true,
                skipRegExps: true,
                skipTemplates: true
            }
        ],
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false
            }
        ],
        'camelcase': [
            'error',

            {
                properties: 'always',
                ignoreDestructuring: false,
                ignoreImports: false,
                allow: ['^CONSTANT_']
            }
        ],
        'default-case': [
            'error'
        ],
        'no-var': [
            'error'
        ],
        'require-await': [
            'error'
        ]
    },
    ignorePatterns: ['mocks/**/*.js', 'report/**/*']
};
