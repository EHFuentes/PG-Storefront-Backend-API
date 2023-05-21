import { createUserAndGetToken } from './helpers/createUserAndGetToken';
import { describe } from 'node:test';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

let token: string;

describe('Products model', () => {
  beforeAll(async () => {
    token = await createUserAndGetToken();
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
    expect(response.status).toBe(201);
  });

  it('should create a second product', async () => {
    const response = await request
      .post('/v1/products/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_name: 'test product 2',
        price: '20',
        product_category: 'test_category',
      });
    expect(response.status).toBe(201);
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
  }, 10000);
});
