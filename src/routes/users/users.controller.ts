import Client from '../../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
console.log('dotenv configured');

// Get the salt rounds from the environment variables
const { saltRounds, pepper } = process.env;

export type Users = {
  first_name: string;
  last_name: string;
  user_password: string;
};

export class usersController {
  // Get all users
  async index(): Promise<Users[]> {
    try {
      // Connect to database
      const conn = await Client.connect();

      // Query database
      const sql = 'SELECT * FROM users_table';

      // Get results
      const results = await conn.query(sql);

      // Close connection
      conn.release();

      // Return results
      return results.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  // Get user by id
  async show(id: string): Promise<Users> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM users_table WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // Create new user function to add to database
  async create(user: Users): Promise<Users> {
    const conn = await Client.connect();
    console.log('start of create function');

    const sql =
      'INSERT INTO users_table (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *';
    console.log('sql query created', sql);

    const hash = bcrypt.hashSync(
      user.user_password + pepper,
      Number(saltRounds)
    );
    console.log('hash created', hash);

    const result = await conn.query(sql, [
      user.first_name,
      user.last_name,
      hash,
    ]);
    console.log('result created', result);

    const createdUser = result.rows[0];
    console.log('createdUser created', createdUser);

    conn.release();

    console.log('end of create function');

    return createdUser;
  }

  async authenticate(
    first_name: string,
    last_name: string,
    user_password: string
  ): Promise<Users | null> {
    const conn = await Client.connect();

    const sql =
      'SELECT user_password FROM users_table WHERE first_name=($1) AND last_name=($2)';

    const result = await conn.query(sql, [first_name, last_name]);

    // If the user exists, return the user object (without the password) else return null
    try {
      if (result.rows.length) {
        const user = result.rows[0];

        const hash = bcrypt.hashSync(user_password, Number(saltRounds));

        if (bcrypt.compareSync(user_password, hash)) {
          return user;
        }
      }

      return null;
    } catch (err) {
      throw new Error(
        `Could not authenticate user ${first_name} ${last_name}. Error: ${err}`
      );
    }
  }
}
