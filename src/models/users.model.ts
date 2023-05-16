import Client from '../services/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Get the salt rounds from the environment variables
const { saltRounds, pepper } = process.env;

export type Users = {
  first_name: string;
  last_name: string;
  username: string;
  user_password: string;
};

export class UsersModel {
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

  async checkUsernameExists(username: string): Promise<boolean> {
    const conn = await Client.connect();
    const sql = 'SELECT username FROM users_table WHERE username = $1';

    const result = await conn.query(sql, [username]);

    conn.release();

    return result.rows.length > 0;
  }

  // Create new user function to add to database
  async create(user: Users): Promise<Users> {
    const conn = await Client.connect();

    if (await this.checkUsernameExists(user.username)) {
      throw new Error('Username already taken');
    }

    const sql =
      'INSERT INTO users_table (first_name, last_name, username, user_password) VALUES($1, $2, $3, $4) RETURNING *';

    const hash = bcrypt.hashSync(
      user.user_password + pepper,
      Number(saltRounds)
    );

    const result = await conn.query(sql, [
      user.first_name.toLowerCase(),
      user.last_name.toLowerCase(),
      user.username.toLowerCase(),
      hash,
    ]);

    if (result.rows.length === 0) {
      throw new Error('Could not create user');
    } else {
      conn.release();
      return result.rows[0];
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<Users | null> {
    try {
      if (!username.trim() || !password.trim()) {
        throw new Error('Username and password must not be empty');
      }

      const conn = await Client.connect();

      const sql = 'SELECT user_password FROM users_table WHERE username=($1);';

      const result = await conn.query(sql, [username]);

      conn.release();

      if (result.rows.length) {
        const user = result.rows[0];

        const hash = bcrypt.hashSync(password, Number(saltRounds));
        if (bcrypt.compareSync(password, hash)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
    }
  }
}
