module.exports = {
    preset: 'ts-jest',
    testEnvironment: '<rootDir>/jest.env.js',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^task_module/(.*)$': '<rootDir>/__mocks__/taskModuleMock.ts',
        '^ui_components/(.*)$': '<rootDir>/__mocks__/ui_components/$1',
        'jwt-decode': '<rootDir>/__mocks__/jwt-decode.js',
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.scss$': 'jest-css-modules-transform',
        '^.+\\.(png|jpg|svg)$': 'jest-transform-stub'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!your-module-to-transform)'
    ],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            isolatedModules: true
        }
    }
};