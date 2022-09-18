module.exports = {
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  testMatch: ['**/tests/*.test.js'],
  verbose: true,
  coveragePathIgnorePatterns: ['<rootDir>/src/jest.config.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
