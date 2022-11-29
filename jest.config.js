/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/src"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/node_modules/identity-obj-proxy",
    },
    transform: {},
    resolver: `./resolver.js`,
};
