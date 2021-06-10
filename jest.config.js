module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    "./test/config/reflect-metadata.ts",
    "./test/config/matchers.ts",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
  ],
  testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/dist",
  ],
  verbose: true,
};
