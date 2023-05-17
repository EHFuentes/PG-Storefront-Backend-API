import { Users, UsersModel } from '../models/users.model';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const { TOKEN_SECRET, saltRounds } = process.env;
const model = new UsersModel();

export class UsersController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await model.index();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json('No users found!');
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await model.show(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json('No users found!');
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await model.authenticate(username, password);

      // signing user with token
      const token = jwt.sign({ user: user }, String(TOKEN_SECRET));

      // send back the token to the client
      res.status(200).json({ token: token });
    } catch (err) {
      res.status(400).json('User unable to login, check username & password!');
    }
  }

  async signupUser(req: Request, res: Response) {
    try {
      const { first_name, last_name, username, password } = req.body;

      if (
        typeof first_name !== 'string' ||
        typeof last_name !== 'string' ||
        typeof username !== 'string' ||
        typeof password !== 'string'
      ) {
        res.status(400).json('Invalid data type');
        return;
      }

      if (
        !first_name.trim() ||
        !last_name.trim() ||
        !username.trim() ||
        !password.trim()
      ) {
        res.status(400).json('Missing required fields!');
        return;
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, Number(saltRounds));

      const user: Users = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        user_password: hashedPassword,
      };

      // create the user in the database
      const newUser = await model.create(user);

      // Generate a token for the new user
      const token = jwt.sign(
        { user: newUser.user_password },
        String(TOKEN_SECRET)
      );

      // send back the token to the client
      res.status(201).json({ token: token });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json('An unexpected error occurred');
      }
    }
  }

  async authLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await model.authenticate(username, password);

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json('User not authenticated!');
    }
  }
}
