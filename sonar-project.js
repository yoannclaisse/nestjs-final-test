const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
    {
        serverUrl: 'http://localhost:9000',
        options: {
            'sonar.sources': 'src',
            'sonar.tests': 'test',
            'sonar.inclusions': 'src/**/*.ts', // Entry point of your code
            'sonar.test.inclusions':
                'test/**/*.spec.ts,test/**/*.e2e-spec.ts,test/**/*.spec.jsx,test/**/*.test.js,test/**/*.test.jsx',
            'sonar.login': 'sqa_47b2de3d4dff47889e58ee08a880d85bd5e009f7',
            'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info'
        },
    },
    () => {
        console.log('Error Occurred while scanning');
    },
);
