import Client from '../../database';

interface users {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
}

export class usersController {
  // Get all users
  async index(): Promise<users[]> {
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
}
