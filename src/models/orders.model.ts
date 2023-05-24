import Client from '../services/database';

export type Orders = {
  id?: number;
  order_id: number;
  product_id?: number;
  product_quantity?: number;
  user_id: number;
  order_status: string;
};

export class OrdersModel {
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

  async addProduct(
    order_id: number,
    product_id: number,
    product_quantity: number
  ): Promise<Orders[]> {
    // add product to order if order is active
    try {
      const conn = await Client.connect();

      const sql =
        'INSERT INTO order_product (order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING *';

      const results = await conn.query(sql, [
        order_id,
        product_id,
        product_quantity,
      ]);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error('Could not add product!');
    }
  }

  // get orders in cart
  async getProductsInOrder() {
    try {
      const conn = await Client.connect();

      const sql = `SELECT * FROM order_product;`;

      const result = await conn.query(sql);

      if (result.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return result.rows;
      }
    } catch (err) {
      throw new Error('Could not get cart!');
    }
  }

  async create(order: Orders): Promise<Orders[]> {
    try {
      if (
        order.order_status !== 'active' &&
        order.order_status !== 'complete'
      ) {
        throw new Error('Invalid order status!');
      }

      const conn = await Client.connect();

      const sql =
        'INSERT INTO orders_table (user_id, order_status) VALUES($1, $2) RETURNING *';

      const results = await conn.query(sql, [
        order.user_id,
        order.order_status.toLowerCase(),
      ]);

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

      const sql = `SELECT
                ot.id as order_id,
                pt.product_name,
                op.product_id,
                pt.price,
                op.product_quantity,
                pt.product_category,
                ot.user_id,
                ut.username,
                ot.order_status

              FROM orders_table AS ot
              INNER JOIN order_product AS op ON op.order_id = ot.id
              INNER JOIN products_table AS pt ON pt.id = op.product_id
              LEFT JOIN users_table AS ut ON ut.id = ot.user_id
              WHERE ot.order_status = 'active' AND ot.user_id = $1;`;

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

      const sql = `SELECT
                ot.id as order_id,
                pt.product_name,
                op.product_id,
                pt.price,
                op.product_quantity,
                pt.product_category,
                ot.user_id,
                ut.username,
                ot.order_status

              FROM orders_table AS ot
              INNER JOIN order_product AS op ON op.order_id = ot.id
              INNER JOIN products_table AS pt ON pt.id = op.product_id
              LEFT JOIN users_table AS ut ON ut.id = ot.user_id
              WHERE ot.order_status = 'complete' AND ot.user_id = $1;`;

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
