CREATE TABLE IF NOT EXISTS orders_table (
    id SERIAL PRIMARY KEY NOT NULL,
    product_id int NOT NULL,
    product_quantity int NOT NULL,
    user_id int NOT NULL,
    order_status varchar(50) NOT NULL
);