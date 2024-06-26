module.exports = {
    spec: ['src/test/**/*.ts'],
    package: './package.json',
    extension: ['.ts'],
    timeout: 5 * 1000,
    color: true,
    grep: '',
    ignore: [''],
    reporter: 'mochawesome',
    'reporter-option': [
        'reportDir=report',
        'reportFilename=index',
        'reportTitle=API Regression Test Report',
        'charts=true',
        'code=false',
        'inline=true',
        'autoOpen=false',
        // 'timestamp=dd-mm-yyyy\'T\'HH-MM-ss',
        'showPassed=true',
        'showFailed=true',
        'showPending=true',
        'showSkipped=true',
        'showHooks=failed'
    ],
    require: ['ts-node/register, tsconfig-paths/register'],
    parallel: false,
    recursive: false,
    retries: 0,
    slow: '75',
    sort: false,
    ui: 'bdd'
};