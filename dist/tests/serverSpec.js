"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
// Create a request variable to use in our tests.
const request = (0, supertest_1.default)(server_1.default);
// Test suite for the server.
(0, node_test_1.describe)('Server', () => {
    // Testing if the server is starting properly.
    it('should start', async () => {
        const response = await request.get('/v1');
        expect(response.status).toBe(200);
        expect(response.text).toBe(`Hello World!`);
    });
});
