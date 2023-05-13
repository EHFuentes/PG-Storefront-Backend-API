CREATE TABLE IF NOT EXISTS orders_table (
    id SERIAL PRIMARY KEY NOT NULL,
    id_of_product int NOT NULL,
    quantity_of_product int NOT NULL,
    user_id int NOT NULL,
    status_of_order varchar(50) NOT NULL
);