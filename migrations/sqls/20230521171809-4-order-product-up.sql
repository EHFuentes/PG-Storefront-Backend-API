CREATE TABLE IF NOT EXISTS order_product (
    order_id INT REFERENCES orders_table(id) NOT NULL,
    product_id INT REFERENCES products_table(id) NOT NULL,
    product_quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);
