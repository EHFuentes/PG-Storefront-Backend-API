import { UsersModel } from '../../models/models.users';
import verifyAuthToken from '../verification';
import bodyParser from 'body-parser';
import express from 'express';

const jsonParser = bodyParser.json();
const model = new UsersModel();

const usersRoutes = () => {
  const router = express.Router();

  router.get('/', verifyAuthToken, model.getAllUsers);

  router.get('/:id', verifyAuthToken, model.getUserById);

  router.post('/login', jsonParser, model.loginUser);

  router.post('/signup', jsonParser, model.signupUser);

  router.post('/auth/user', jsonParser, verifyAuthToken, model.authLogin);

  return router;
};

export default usersRoutes;
