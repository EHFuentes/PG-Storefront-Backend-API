import express, { Request, Response } from 'express';
import productsRoute from './products.route';
import orderRoutes from './orders.route';
import usersRoute from './users.route';

const api: express.Application = express();

// define a route handler for the default home page
const home = async (req: Request, res: Response) => {
  res.send('Hello World!');
};
api.get('/', home);

// Middleware
api.use('/users', usersRoute());
api.use('/products', productsRoute());
api.use('/orders', orderRoutes());

export default api;
