import Client from '../../database';

export type Products = {
  name: string;
  price: number;
  category: string;
};

export class ProductsController {
  async index(): Promise<Products[]> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM products_table;';

      const results = await conn.query(sql);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error(`Count not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Products[]> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM products_table WHERE id=($1);';

      const result = await conn.query(sql, [id]);

      if (result.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Products): Promise<Products[]> {
    try {
      const conn = await Client.connect();

      const sql =
        'INSERT INTO products_table (name, price, category) VALUES($1, $2, $3) RETURNING *';

      const results = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error(
        `Could not create product ${product.name}. Error: ${err}`
      );
    }
  }

  // [OPTIONAL] Top 5 most popular products
  // [OPTIONAL] Products by category (args: product category)
}
