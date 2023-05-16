import productsRoutes from './routes/products/products.routes';
import usersRoutes from './routes/users/users.routes';
import orderRoutes from './routes/orders/orders.routes';
import express, { Request, Response } from 'express';

const api: express.Application = express();

// define a route handler for the default home page
const home = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

api.get('/', home);
api.use('/users', usersRoutes());
api.use('/products', productsRoutes());
api.use('/orders', orderRoutes());

export default api;
