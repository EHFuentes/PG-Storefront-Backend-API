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
    price FLOAT NOT NULL,
    product_category VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders_table (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id int REFERENCES users_table(id) NOT NULL,
    order_status varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_product (
    order_id INT REFERENCES orders_table(id) NOT NULL,
    product_id INT REFERENCES products_table(id) NOT NULL,
    product_quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id)
);


