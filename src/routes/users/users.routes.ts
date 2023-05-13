import { usersController } from './users.controller';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../verification';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const controller = new usersController();

const usersRoutes = () => {
  const router = express.Router();

  // get all users
  router.get('/', verifyAuthToken, async (req: Request, res: Response) => {
    // get all users
    try {
      const users = await controller.index();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json('No users found!');
    }
  });

  // get user by id
  router.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const user = await controller.show(req.params.id);
      res.status(200);
      res.json(user);
    } catch (err) {
      res.status(400);
      res.json('No users found!');
    }
  });

  // create user
  router.post('/', verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const newUser = await controller.create(req.body);
      const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
      res.json(token);
    } catch (err) {
      res.status(400);
      res.json('User not created!');
    }
  });

  // authenticate a user
  router.get(
    '/auth/user',
    verifyAuthToken,
    async (req: Request, res: Response) => {
      const user = await controller.authenticate(
        req.body.first_name,
        req.body.last_name,
        req.body.user_password
      );
      res.status(200);
      res.json(user);
    }
  );

  return router;
};

export default usersRoutes;
