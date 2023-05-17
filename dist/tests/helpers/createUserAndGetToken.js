"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAndGetToken = void 0;
// testHelpers.ts
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app")); // Replace './app' with the path to your app file
async function createUserAndGetToken() {
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'JohnDoe',
        password: 'password123',
    };
    const response = await (0, supertest_1.default)(app_1.default).post('/v1/users/signup').send(user);
    expect(response.status).toBe(201);
    return response.body.token;
}
exports.createUserAndGetToken = createUserAndGetToken;
