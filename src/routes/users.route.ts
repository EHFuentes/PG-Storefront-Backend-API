import { UsersController } from '../controllers/users.controller';
import verifyAuthToken from '../services/verification';
import bodyParser from 'body-parser';
import express from 'express';

const jsonParser = bodyParser.json();
const controller = new UsersController();

const usersRoute = () => {
  const router = express.Router();

  router.get('/', verifyAuthToken, controller.getAllUsers);

  router.get('/:id', verifyAuthToken, controller.getUserById);

  router.post('/login', jsonParser, controller.loginUser);

  router.post('/signup', jsonParser, controller.signupUser);

  router.post('/auth/user', jsonParser, verifyAuthToken, controller.authLogin);

  return router;
};

export default usersRoute;
