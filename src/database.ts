import dotenv from 'dotenv';
import { Pool } from 'pg';

// load the .env file
dotenv.config();

// destructure the .env file for the database connection
const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let Client = new Pool();
console.log('ENV:', ENV);

// if the environment is tests, then we will use the test database
if (ENV === 'test') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

// if the environment is development, then we will use the development database
if (ENV === 'dev') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default Client;
