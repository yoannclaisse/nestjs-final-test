const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
    {
        serverUrl: 'http://localhost:9000',
        options: {
            'sonar.sources': 'src',
            'sonar.tests': 'src',
            'sonar.inclusions': 'src/**/*.ts', // Entry point of your code
            'sonar.test.inclusions':
                'src/**/*.spec.ts,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.login': 'sqa_47b2de3d4dff47889e58ee08a880d85bd5e009f7',
            'sonar.javascript.lcov.reportPaths': 'test/coverage/lcov.info'
        },
    },
    () => {
        console.log('Error Occurred while scanning');
    },
);
