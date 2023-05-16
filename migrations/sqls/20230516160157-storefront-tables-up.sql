CREATE TABLE IF NOT EXISTS users_table (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products_table (
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    product_category VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders_table (
    id SERIAL PRIMARY KEY NOT NULL,
    product_id int NOT NULL,
    product_quantity int NOT NULL,
    user_id int NOT NULL,
    order_status varchar(50) NOT NULL
);