import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get authorization header from request
    const authHeader = req.headers.authorization;

    // Check if authorization header is present
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing' });
    }

    // Check if authorization header is valid
    const token = authHeader.split(' ')[1];

    // Verify token from request body using the TOKEN_SECRET from the .env file
    jwt.verify(token, String(TOKEN_SECRET), (err) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // If token is valid, save the user object in the request object
      // req.body.user = user;

      next();
    });
  } catch (error) {
    res.status(401).json('Access Denied, not verified');
  }
};

export default verifyAuthToken;
