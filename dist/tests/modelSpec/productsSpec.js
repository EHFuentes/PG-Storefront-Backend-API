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
(0, node_test_1.describe)('Products model', () => {
    beforeAll(async () => {
        token = await (0, createUserAndGetToken_1.createUserAndGetToken)();
    });
    // create a product
    it('should create a product', async () => {
        const response = await request
            .post('/v1/products/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
            product_name: 'test product',
            price: '10',
            product_category: 'test_category',
        });
        const response2 = await request
            .post('/v1/products/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
            product_name: 'test product 2',
            price: '20',
            product_category: 'test_category',
        });
        expect(response.status).toBe(201);
        expect(response2.status).toBe(201);
    });
    // product by id
    it('should get a product by id', async () => {
        const response = await request
            .get('/v1/products/1')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    // product by category
    it('should get a product by category', async () => {
        const response = await request
            .get('/v1/products/category/test_category')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    // all products
    it('should get all products', async () => {
        const response = await request
            .get('/v1/products')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    // top 5 products
    it('should get top 5 products', async () => {
        const response = await request
            .get('/v1/products/orders/top')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
});
