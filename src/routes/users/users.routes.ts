import { UsersController } from './users.controller';
import express, { Request, Response } from 'express';
import verifyAuthToken from '../verification';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const jsonParser = bodyParser.json();

dotenv.config();
const { TOKEN_SECRET } = process.env;

const controller = new UsersController();

const usersRoutes = () => {
  const router = express.Router();
  // get all users
  router.get('/', verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const users = await controller.index();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json('No users found!, check user table!');
    }
  });

  // get user by id
  router.get('/:id', verifyAuthToken, async (req: Request, res: Response) => {
    try {
      const user = await controller.show(req.params.id);
      res.status(200);
      res.json(user);
    } catch (err) {
      res.status(400).json('No users found!, check user table!');
    }
  });

  // create user
  router.post(
    '/',
    jsonParser,
    verifyAuthToken,
    async (req: Request, res: Response) => {
      try {
        const newUser = await controller.create(req.body);
        const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
        res.json(token);
      } catch (err) {
        res.status(400).json('User not created!, check user table!');
      }
    }
  );

  // authenticate a user
  router.get(
    '/auth/user',
    jsonParser,
    verifyAuthToken,
    async (req: Request, res: Response) => {
      try{
        const user = await controller.authenticate(
            req.body.first_name,
            req.body.last_name,
            req.body.user_password
        );
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json('User not authenticated!');
      }
    });

  return router;
};

export default usersRoutes;
