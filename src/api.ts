import express, { Request, Response } from 'express';
import UsersRoutes from './routes/users/users.routes';

const api: express.Application = express();

// define a route handler for the default home page
const home = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

api.get('/', home);

// get testing route
api.use('/users', UsersRoutes());

export default api;
