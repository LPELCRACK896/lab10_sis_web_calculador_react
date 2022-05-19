const {defaults} = require('jest-config')
module.exports = {
    setupFilesAfterEnv: ["./setUpTest.js"],
    verbose: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
    testEnvironment: "jsdom",
}