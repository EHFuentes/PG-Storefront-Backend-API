import supertest from 'supertest';
import app from '../../app';

export async function createUserAndGetToken(): Promise<string> {
  const user = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'JohnDoe',
    password: 'password123',
  };

  const response = await supertest(app).post('/v1/users/signup').send(user);

  expect(response.status).toBe(201);

  return response.body.token;
}
