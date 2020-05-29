const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [ 
      '<rootDir>/tests/unit/*.spec.js'
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '^.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    testPathIgnorePatterns: [
      '<rootDir>/node_modules'
    ],
    coverageDirectory: '<rootDir>/tests/unit/coverage',
    collectCoverageFrom: [
      'src/**/*.{js,vue}',
      '!src/main.js',
      '!src/router/index.js',
      '!src/node_modules/**'
    ]
}