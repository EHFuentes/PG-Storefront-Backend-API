import { usersController } from './users.controller';
import express, { Request, Response } from 'express';

const controller = new usersController();

const usersRoutes = () => {
  const router = express.Router();

  // get all users
  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await controller.index();
      res.status(200);
      res.json(users);
    } catch (err) {
      res.status(400);
      res.json('No users found!');
    }
  });
  return router;
};

export default usersRoutes;
