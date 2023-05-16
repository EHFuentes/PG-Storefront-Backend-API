import Client from '../../database';

export type Orders = {
  product_id: number;
  product_quantity: number;
  user_id: number;
  order_status: string;
};

export class OrdersController {
  async index() {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM orders_table;';

      const results = await conn.query(sql);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error('No orders found!');
    }
  }

  async show(id: string): Promise<Orders[]> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM orders_table WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      if (result.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return result.rows;
      }
    } catch (err) {
      throw new Error('No order found!');
    }
  }

  async create(order: Orders): Promise<Orders[]> {
    try {
      const conn = await Client.connect();

      const sql =
        'INSERT INTO orders_table (product_id,product_quantity, user_id, order_status) VALUES($1, $2, $3, $4) RETURNING *';

      const results = await conn.query(sql, [
        order.product_id,
        order.product_quantity,
        order.user_id,
        order.order_status.toLowerCase(),
      ]);

      if (
        order.order_status !== 'active' &&
        order.order_status !== 'complete'
      ) {
        throw new Error();
      }

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error('Could not create order!');
    }
  }

  // Current Order by user (args: user id)
  async currentOrders(user_id: string) {
    try {
      const conn = await Client.connect();

      const sql =
        'SELECT \n' +
        '\tot.id, \n' +
        '\tot.product_id, \n' +
        '\tpt.product_name, \n' +
        '\tpt.price, \n' +
        '\tot.product_quantity, \n' +
        '\tpt.product_category, \n' +
        '\tut.id as user_id,\n' +
        '\tut.username,\n' +
        '\tot.order_status \n' +
        'FROM orders_table AS ot \n' +
        'INNER JOIN products_table AS pt \n' +
        'ON pt.id = ot.product_id \n' +
        'INNER JOIN users_table as ut\n' +
        'ON ut.id = ot.user_id\n' +
        '\n' +
        "WHERE ot.order_status = 'active' AND ut.id = $1;";

      const results = await conn.query(sql, [user_id]);
      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error(`Could not get current orders. Error: ${err}`);
    }
  }

  // Completed Orders by user (args: user id)
  async ordersByUsers(user_id: string) {
    try {
      const conn = await Client.connect();

      const sql =
        'SELECT \n' +
        '\tot.id, \n' +
        '\tot.product_id, \n' +
        '\tpt.product_name, \n' +
        '\tpt.price, \n' +
        '\tot.product_quantity, \n' +
        '\tpt.product_category, \n' +
        '\tut.id as user_id,\n' +
        '\tut.username,\n' +
        '\tot.order_status \n' +
        'FROM orders_table AS ot \n' +
        'INNER JOIN products_table AS pt \n' +
        'ON pt.id = ot.product_id \n' +
        'INNER JOIN users_table as ut\n' +
        'ON ut.id = ot.user_id\n' +
        '\n' +
        "WHERE ot.order_status = 'complete' AND ut.id = $1;";

      const results = await conn.query(sql, [user_id]);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error('No orders found!');
    }
  }
}
