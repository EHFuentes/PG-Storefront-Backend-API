import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from request body
    const token = req.body.token;

    // Decode token using the TOKEN_SECRET from the .env file
    const decoded = jwt.verify(token, String(TOKEN_SECRET));

    // Verify token from request body using the TOKEN_SECRET from the .env file
    jwt.verify(token, String(TOKEN_SECRET));

    // Add decoded token to request body
    req.body.token = decoded;

    next();
  } catch (error) {
    // If token is invalid, return 401 status code
    res.status(401).json('Access Denied, not verified');
  }
};

export default verifyAuthToken;
