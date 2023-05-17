# Storefront API Overview

This project is a RESTful API for an online storefront. It's built with TypeScript, Node.js, Express, and PostgreSQL, and provides a backend for managing products, users, and orders.

Users can browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. In addition, the API provides various endpoints to manage products, users, and orders, including authentication and authorization.

## Installation
To set up and run this project, follow the steps below:
- Clone the repository to your local machine using git clone.
- Navigate to the project directory in your terminal.

Install the necessary dependencies using npm install:
- bcrypt
- body-parser
- cors
- db-migrate
- db-migrate-pg
- dotenv
- express
- helmet
- jsonwebtoken
- pg
- cross-env

## Running the Project
After installing the dependencies, you can run the following npm scripts:
- npm run test: Run the tests for the project.
- npm run migrate:up: Migrates the database to the latest configuration.
- npm run watch: Starts the server in development mode with hot-reloading.

## Database Configuration
The project uses PostgreSQL for data storage. Make sure you have PostgreSQL installed and correctly configured.

You will need to create a .env file in the root of your project and define the following variables:

#### DATABASE
- POSTGRES_HOST
- POSTGRES_DB_DEV
- POSTGRES_DB_TEST
- POSTGRES_USER
- POSTGRES_PASSWORD
- ENV

Other variables in the .env file include:
- TOKEN_SECRET
- PEPPER
- saltRounds 
- PORT
- HOST_ADDRESS

## Database Connection Management
The database connection in this application is managed using an object named Client.
This is an instance of the Pool class from the pg (node-postgres) library, which is designed to handle
pooling of database connections, thus improving efficiency.

The configuration of the Client object is directly influenced by the environment in which the application
is currently running. The application supports two environments:

- Development ('dev'): In this environment, the Client object connects to the development database.

- Testing ('test'): In this environment, the Client object connects to the test database.

The current environment is specified by the ENV variable in the .env file. Depending on the value of ENV,
the Client object will be configured to connect to the appropriate database.

In addition, the .env file contains the credentials (hostname, username, password, and database name)
for both the development and test databases. These are used by the Client object to establish a connection to the correct database.


## API Endpoints
#### Products
- GET /v1/products: Retrieve all products.
- GET /v1/products/:id: Get product information by ID.
- GET /v1/products/category/:product_category: Get products by category.
- GET /v1/products/orders/top: Retrieve the top 5 products based on order quantity.
- POST /v1/products/create: Create a new product.
#### Users
- POST /v1/users/signup: Register a new user.
- POST /v1/users/login: Authenticate a user and retrieve a JWT token.
- GET /v1/users/:id: Get user information by ID.
#### Orders
- GET /v1/orders: Retrieve all orders.
- GET /v1/orders/:id: Get order information by ID.
- GET /v1/orders/status/active/:user_id: Get active orders by user ID.
- GET /v1/orders/status/complete/:user_id: Get complete orders by user ID.
- POST /v1/orders/create: Create a new order.

# Data Shapes
The API handles the following data structures:

#### Products
- id
- product_name
- price
- product_category
#### Users
- id
- first_name
- last_name
- username
- user_password 
#### Orders
- id
- product_id
- product_quantity
- user_id
- order_status (active or complete)


## Testing
The application includes comprehensive test coverage for the API endpoints. The tests are designed to ensure the API endpoints respond as expected.

The tests use supertest for making requests to the application.

Before running the tests, ensure all dependencies are installed by running npm install.

### Test Suites
The application includes the following test suites:
- User Tests: Tests for user authentication and fetching user details.
- Product Tests: Tests for creating a new product, fetching product details, fetching products by category, and fetching all products.
- Order Tests: Tests for creating new orders, fetching order details, fetching active orders for a user, fetching complete orders for a user, and fetching all orders.

For more details on the tests, check out the test files in the tests directory of the project.