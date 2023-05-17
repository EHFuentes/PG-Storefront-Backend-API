"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_model_1 = require("../models/users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const { TOKEN_SECRET, saltRounds } = process.env;
const model = new users_model_1.UsersModel();
class UsersController {
    async getAllUsers(req, res) {
        try {
            const users = await model.index();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(400).json('No users found!');
        }
    }
    async getUserById(req, res) {
        try {
            const user = await model.show(req.params.id);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(400).json('No users found!');
        }
    }
    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await model.authenticate(username, password);
            // signing user with token
            const token = jsonwebtoken_1.default.sign({ user: user }, String(TOKEN_SECRET));
            // send back the token to the client
            res.status(200).json({ token: token });
        }
        catch (err) {
            res.status(400).json('User unable to login, check username & password!');
        }
    }
    async signupUser(req, res) {
        try {
            const { first_name, last_name, username, password } = req.body;
            if (typeof first_name !== 'string' ||
                typeof last_name !== 'string' ||
                typeof username !== 'string' ||
                typeof password !== 'string') {
                res.status(400).json('Invalid data type');
                return;
            }
            if (!first_name.trim() ||
                !last_name.trim() ||
                !username.trim() ||
                !password.trim()) {
                res.status(400).json('Missing required fields!');
                return;
            }
            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt_1.default.hash(password, Number(saltRounds));
            const user = {
                first_name: first_name,
                last_name: last_name,
                username: username,
                user_password: hashedPassword,
            };
            // create the user in the database
            const newUser = await model.create(user);
            // Generate a token for the new user
            const token = jsonwebtoken_1.default.sign({ user: newUser.user_password }, String(TOKEN_SECRET));
            // send back the token to the client
            res.status(201).json({ token: token });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json(err.message);
            }
            else {
                res.status(500).json('An unexpected error occurred');
            }
        }
    }
    async authLogin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await model.authenticate(username, password);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(400).json('User not authenticated!');
        }
    }
}
exports.UsersController = UsersController;
