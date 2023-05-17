import { describe } from 'node:test';
import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

import { createUserAndGetToken } from '../helpers/createUserAndGetToken';

let token: string;

describe('Orders model', () => {
  beforeAll(async () => {
    token = await createUserAndGetToken();
  });

  // create an order
  it('should create an order', async () => {
    // Create the first order
    const response1 = await request
      .post('/v1/orders/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_id: 1,
        product_quantity: 2,
        user_id: 1,
        order_status: 'active',
      });

    // Create the second order
    const response2 = await request
      .post('/v1/orders/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_id: 2,
        product_quantity: 2,
        user_id: 1,
        order_status: 'complete',
      });

    // Check if both orders were created successfully
    expect(response1.status).toBe(201);
    expect(response2.status).toBe(201);
  });

  // get order by id
  it('should get order by id', async () => {
    const response = await request
      .get('/v1/orders/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  // get active orders by user id
  it('should get active orders by user id', async () => {
    const response = await request
      .get('/v1/orders/status/active/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  // get complete orders by user id
  it('should get complete orders by user id', async () => {
    const response = await request
      .get('/v1/orders/status/complete/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  // get all orders
  it('should get all orders', async () => {
    const response = await request
      .get('/v1/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });
});
