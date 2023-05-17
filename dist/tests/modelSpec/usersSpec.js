"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const createUserAndGetToken_1 = require("../helpers/createUserAndGetToken");
const request = (0, supertest_1.default)(server_1.default);
let token;
// Test suite for the orders model.
(0, node_test_1.describe)('Orders model', () => {
    beforeAll(async () => {
        token = await (0, createUserAndGetToken_1.createUserAndGetToken)();
    });
    // get user by id
    it('should get user by id', async () => {
        const response = await request
            .get('/v1/users/1')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    // authenticate user
    it('should authenticate user', async () => {
        const response = await request.post('/v1/users/login').send({
            username: 'JohnDoe',
            password: 'password123',
        });
        expect(response.status).toBe(200);
    });
    // get all users
    it('should get all users', async () => {
        const response = await request
            .get('/v1/users')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
