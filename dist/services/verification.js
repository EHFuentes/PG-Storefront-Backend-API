"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const verifyAuthToken = (req, res, next) => {
    try {
        // Get authorization header from request
        const authHeader = req.headers.authorization;
        // Check if authorization header is present
        if (!authHeader) {
            return res.status(401).json({ message: 'Access Denied, not verified ' });
        }
        // Check if authorization header is valid
        const token = authHeader.split(' ')[1];
        // Verify token from request body using the TOKEN_SECRET from the .env file
        jsonwebtoken_1.default.verify(token, String(TOKEN_SECRET), (err) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            next();
        });
    }
    catch (error) {
        res.status(401).json('Access Denied, not verified');
    }
};
exports.default = verifyAuthToken;
