import { describe } from 'node:test';
import supertest from 'supertest';
import app from '../../server';
import { createUserAndGetToken } from '../helpers/createUserAndGetToken';

const request = supertest(app);

let token: string;

// Test suite for the orders model.
describe('Orders model', () => {
  beforeAll(async () => {
    token = await createUserAndGetToken();
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
