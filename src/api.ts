import express, { Request, Response } from 'express';

const api: express.Application = express();

// define a route handler for the default home page
const testing = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

// get testing route
api.get('/', testing);

export default api;
