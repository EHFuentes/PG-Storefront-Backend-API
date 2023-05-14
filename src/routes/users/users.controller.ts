import Client from '../../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Get the salt rounds from the environment variables
const { saltRounds, pepper } = process.env;

export type Users = {
  first_name: string;
  last_name: string;
  user_password: string;
};

export class UsersController {
  // Get all users
  async index(): Promise<Users[]> {
    // Connect to database
    const conn = await Client.connect();

    // Query database
    const sql = 'SELECT * FROM users_table;';

    // Get results
    const results = await conn.query(sql);

    // if no results, throw error
    if (results.rows.length === 0) {
      throw new Error();
    } else {
      conn.release();
      return results.rows;
    }
  }

  // Get user by id
  async show(id: string): Promise<Users> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM users_table WHERE id=($1);';

      const result = await conn.query(sql, [id]);

      if (result.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  // Create new user function to add to database
  async create(user: Users): Promise<Users> {
    const conn = await Client.connect();

    const sql =
      'INSERT INTO users_table (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *';

    const hash = bcrypt.hashSync(
      user.user_password + pepper,
      Number(saltRounds)
    );

    const result = await conn.query(sql, [
      user.first_name,
      user.last_name,
      hash,
    ]);

    if (result.rows.length === 0) {
      throw new Error();
    } else {
      conn.release();
      return result.rows[0];
    }
  }

  async authenticate(
    first_name: string,
    last_name: string,
    user_password: string
  ): Promise<Users | null> {
    const conn = await Client.connect();

    const sql =
      'SELECT user_password FROM users_table WHERE first_name=($1) AND last_name=($2);';

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
