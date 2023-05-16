import express, { Request, Response } from 'express';
import productsRoute from './routes/products.route';
import orderRoutes from './routes/orders.route';
import usersRoute from './routes/users.route';

const api: express.Application = express();

// define a route handler for the default home page
const home = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

api.get('/', home);
api.use('/users', usersRoute());
api.use('/products', productsRoute());
api.use('/orders', orderRoutes());

export default api;
