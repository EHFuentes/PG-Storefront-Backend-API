CREATE TABLE IF NOT EXISTS orders_table (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id int REFERENCES users_table(id) NOT NULL,
    order_status varchar(50) NOT NULL
);