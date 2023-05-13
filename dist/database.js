"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// load the .env file
dotenv_1.default.config();
// destructure the .env file for the database connection
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB_DEV = _a.POSTGRES_DB_DEV, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var Client;
console.log('ENV:', ENV);
// if the environment is tests, then we will use the test database
if (ENV === 'test') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
// if the environment is development, then we will use the development database
if (ENV === 'dev') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_DEV,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = Client;
