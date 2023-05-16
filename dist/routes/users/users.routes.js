"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_users_1 = require("../../models/models.users");
var verification_1 = __importDefault(require("../verification"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var jsonParser = body_parser_1.default.json();
var model = new models_users_1.UsersModel();
var usersRoutes = function () {
    var router = express_1.default.Router();
    router.get('/', verification_1.default, model.getAllUsers);
    router.get('/:id', verification_1.default, model.getUserById);
    router.post('/login', jsonParser, model.loginUser);
    router.post('/signup', jsonParser, model.signupUser);
    router.post('/auth/user', jsonParser, verification_1.default, model.authLogin);
    return router;
};
exports.default = usersRoutes;
