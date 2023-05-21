"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_controller_1 = require("../controllers/users.controller");
var verification_1 = __importDefault(require("../services/verification"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var jsonParser = body_parser_1.default.json();
var controller = new users_controller_1.UsersController();
var usersRoute = function () {
    var router = express_1.default.Router();
    router.get('/', verification_1.default, controller.getAllUsers);
    router.get('/:id', verification_1.default, controller.getUserById);
    router.post('/login', jsonParser, controller.loginUser);
    router.post('/signup', jsonParser, controller.signupUser);
    router.post('/auth/user', jsonParser, verification_1.default, controller.authLogin);
    return router;
};
exports.default = usersRoute;
