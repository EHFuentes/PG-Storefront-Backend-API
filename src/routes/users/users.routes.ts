import { UsersController } from './users.controller';
import express, { Request, Response } from 'express';
import verifyAuthToken from '../verification';
import { Users } from './users.controller';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const jsonParser = bodyParser.json();

dotenv.config();
const { TOKEN_SECRET, saltRounds } = process.env;

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

  // login user
  router.post('/login', jsonParser, async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await controller.authenticate(username, password);

      // signing user with token
      const token = jwt.sign({ user: user }, String(TOKEN_SECRET));

      // send back the token to the client
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(400).json('User not authenticated!');
    }
  });

  // signup user
  router.post('/signup', jsonParser, async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, username, password } = req.body;

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, Number(saltRounds));

      const user: Users = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        user_password: hashedPassword,
      };

      // create the user in the database
      const newUser = await controller.create(user);

      // Generate a token for the new user
      const token = jwt.sign(
        { user: newUser.user_password },
        String(TOKEN_SECRET)
      );

      // send back the token to the client
      res.status(200).json({ token: token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json('An unexpected error occurred');
      }
    }
  });

  // authenticate a user
  router.post(
    '/auth/user',
    jsonParser,
    verifyAuthToken,
    async (req: Request, res: Response) => {
      try {
        const user = await controller.authenticate(
          req.body.username,
          req.body.password
        );
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json('User not authenticated!');
      }
    }
  );

  return router;
};

export default usersRoutes;
