import Client from '../services/database';

export type Products = {
  id?: number;
  price: number;
  product_name: string;
  product_category: string;
};

export class ProductsModel {
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

  async show(id: string): Promise<Products> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM products_table WHERE id=($1);';

      const result = await conn.query(sql, [id]);

      if (result.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return result.rows[0]; // This is a single product, not an array
      }
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(product: Products): Promise<Products[]> {
    try {
      const conn = await Client.connect();

      const sql = `INSERT INTO products_table (product_name, price, product_category)
         VALUES($1, $2, $3) RETURNING *`;

      const results = await conn.query(sql, [
        product.product_name.toLowerCase(),
        product.price,
        product.product_category.toLowerCase(),
      ]);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error(
        `Could not create product ${product.product_name}. Error: ${err}`
      );
    }
  }

  // Products by category (args: product category)
  async productCategory(productCategory: string) {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM products_table WHERE product_category=($1);';

      const results = await conn.query(sql, [productCategory]);

      if (results.rows.length === 0) {
        throw new Error();
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error(
        `Could not find product category "${productCategory}". Error: ${err}`
      );
    }
  }

  // Top 5 most popular products
  async getTopFive() {
    try {
      const conn = await Client.connect();

      const sql = `SELECT
            ot.id as order_id,
            pt.product_name,
            op.product_id,
            pt.price,
            op.product_quantity,
            pt.product_category,
            ot.order_status

          FROM orders_table AS ot
          INNER JOIN order_product AS op ON op.order_id = ot.id
          INNER JOIN products_table AS pt ON pt.id = op.product_id
          ORDER BY op.product_quantity DESC;`;

      const results = await conn.query(sql);

      if (results.rows.length === 0) {
        throw new Error('No products found in top five!'); // specify an error message
      } else {
        conn.release();
        return results.rows;
      }
    } catch (err) {
      throw new Error(`Could not find top five products. Error: ${err}`);
    }
  }
}
