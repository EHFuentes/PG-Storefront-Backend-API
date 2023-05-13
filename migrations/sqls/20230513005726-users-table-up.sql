CREATE TABLE IF NOT EXISTS users_table (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL
);