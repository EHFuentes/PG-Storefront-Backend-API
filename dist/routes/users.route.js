"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
const verification_1 = __importDefault(require("../services/verification"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonParser = body_parser_1.default.json();
const controller = new users_controller_1.UsersController();
const usersRoute = () => {
    const router = express_1.default.Router();
    router.get('/', verification_1.default, controller.getAllUsers);
    router.get('/:id', verification_1.default, controller.getUserById);
    router.post('/login', jsonParser, controller.loginUser);
    router.post('/signup', jsonParser, controller.signupUser);
    router.post('/auth/user', jsonParser, verification_1.default, controller.authLogin);
    return router;
};
exports.default = usersRoute;
