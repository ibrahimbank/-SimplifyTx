module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        'next/router': '<rootDir>/__mocks__/next/router.js',
    },
};