CREATE TABLE IF NOT EXISTS products_table (
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    product_category VARCHAR(100) NOT NULL
);