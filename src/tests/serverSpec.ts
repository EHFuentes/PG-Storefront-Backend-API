import supertest from "supertest";
import startServer from "../server";
import { describe } from 'node:test';
import dotenv from 'dotenv';
import app, { HOST_ADDRESS, PORT } from "../server";

const address = HOST_ADDRESS + ':' + PORT;

// Create a request variable to use in our tests.
const request = supertest(app);

// Test suite for the server.
describe('Server', () => {
    // Testing if the server is starting properly.
    it('should start', async () => {
        const response = await request.get('/v1');

        expect(response.status).toBe(200);
        expect(response.text).toBe(`Hello World!`);
    });
});
