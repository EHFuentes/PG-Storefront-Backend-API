"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var verifyAuthToken = function (req, res, next) {
    try {
        // Get token from request body
        var token = req.body.token;
        // Decode token using the TOKEN_SECRET from the .env file
        var decoded = jsonwebtoken_1.default.verify(token, String(TOKEN_SECRET));
        // Verify token from request body using the TOKEN_SECRET from the .env file
        jsonwebtoken_1.default.verify(token, String(TOKEN_SECRET));
        // Add decoded token to request body
        req.body.token = decoded;
        next();
    }
    catch (error) {
        // If token is invalid, return 401 status code
        res.status(401).json('Access Denied, not verified');
    }
};
exports.default = verifyAuthToken;
