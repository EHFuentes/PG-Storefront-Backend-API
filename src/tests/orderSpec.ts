import { createUserAndGetToken } from './helpers/createUserAndGetToken';
import { describe } from 'node:test';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

let token: string;

describe('Order Endpoints', () => {
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
    expect(response1.status).toBe(201);
  });

  it('should create a second order', async () => {
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
    expect(response2.status).toBe(201);
  });

  // get order by id
  it('should get order by id', async () => {
    const response = await request
      .get('/v1/orders/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  // get all order
  let lastOrderId: number;

  it('should get all orders', async () => {
    const response = await request
      .get('/v1/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);

    // get the last order id where the order_status is 'active' with loop
    for (let i = 0; i < response.body.length; i++) {
      if (response.body[i].order_status === 'active') {
        lastOrderId = response.body[i].id;
      }
    }
  });

  // get active orders by user id
  it('should get active orders by user id', async () => {
    // get the id of the orders that are active
    const response3 = await request
      .get('/v1/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(response3.status).toBe(200);

    const response = await request
      .get(`/v1/orders/status/active/1`)
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  }, 8000);

  // get active orders by user id
  it('should get complete orders by user id', async () => {
    // get the id of the orders that are active
    const response = await request
      .get('/v1/orders')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);

    const response1 = await request
      .get(`/v1/orders/status/active/1`)
      .set('Authorization', 'Bearer ' + token);
    expect(response1.status).toBe(200);
  }, 8000);

  // add product to order
  let product_Id: number | undefined;

  it('should be able to add a product to active order', async () => {
    // create a product to add to the order
    const response = await request
      .post('/v1/products/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_name: 'add_product_to_order_test',
        price: '30',
        product_category: 'test_category',
      });
    expect(response.status).toBe(201);

    // get all products
    const response2 = await request
      .get('/v1/products')
      .set('Authorization', 'Bearer ' + token);
    expect(response2.status).toBe(200);

    //  get the id of the last product
    for (let i = 0; i < response2.body.length; i++) {
      if (i === response2.body.length - 1) {
        product_Id = response2.body[i].id;
      }
    }

    const response3 = await request
      .post(`/v1/orders/${Number(lastOrderId)}/products`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_id: 1,
        product_quantity: 2,
      });

    expect(response3.status).toBe(201);
  }, 7000);

  // add product to complete order to test model
  it('should be able to a add product to complete order', async () => {
    // create a product to add to the order
    const response = await request
      .post('/v1/products/create')
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_name: 'add_product_to_order_test_complete',
        price: '20',
        product_category: 'test_category',
      });

    expect(response.status).toBe(201);

    const response2 = await request
      .get('/v1/products')
      .set('Authorization', 'Bearer ' + token);
    expect(response2.status).toBe(200);

    //  get the id of the last product
    for (let i = 0; i < response2.body.length; i++) {
      if (i === response2.body.length - 1) {
        product_Id = response2.body[i].id;
      }
    }

    const response3 = await request
      .post(`/v1/orders/${Number(lastOrderId - 1)}/products`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        product_id: 1,
        product_quantity: 2,
      });

    expect(response3.status).toBe(201);
  }, 7000);
});
