"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var users_model_1 = require("../models/users.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
var _a = process.env, TOKEN_SECRET = _a.TOKEN_SECRET, saltRounds = _a.saltRounds;
var model = new users_model_1.UsersModel();
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.getAllUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model.index()];
                    case 1:
                        users = _a.sent();
                        res.status(200).json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(400).json('No users found!');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, model.show(req.params.id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(400).json('No users found!');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, user, token, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, model.authenticate(username, password)];
                    case 1:
                        user = _b.sent();
                        token = jsonwebtoken_1.default.sign({ user: user }, String(TOKEN_SECRET));
                        // send back the token to the client
                        res.status(200).json({ token: token });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        res.status(400).json('User unable to login, check username & password!');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.signupUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, first_name, last_name, username, password, hashedPassword, user, newUser, token, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, first_name = _a.first_name, last_name = _a.last_name, username = _a.username, password = _a.password;
                        if (typeof first_name !== 'string' ||
                            typeof last_name !== 'string' ||
                            typeof username !== 'string' ||
                            typeof password !== 'string') {
                            res.status(400).json('Invalid data type');
                            return [2 /*return*/];
                        }
                        if (!first_name.trim() ||
                            !last_name.trim() ||
                            !username.trim() ||
                            !password.trim()) {
                            res.status(400).json('Missing required fields!');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(String(password), Number(saltRounds))];
                    case 1:
                        hashedPassword = _b.sent();
                        user = {
                            first_name: first_name,
                            last_name: last_name,
                            username: username,
                            user_password: hashedPassword,
                        };
                        return [4 /*yield*/, model.create(user)];
                    case 2:
                        newUser = _b.sent();
                        token = jsonwebtoken_1.default.sign({ user: newUser.user_password }, String(TOKEN_SECRET));
                        // send back the token to the client
                        res.status(201).json({ token: token });
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _b.sent();
                        if (err_4 instanceof Error) {
                            res.status(400).json(err_4.message);
                        }
                        else {
                            res.status(500).json('An unexpected error occurred');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.authLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, user, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, username = _a.username, password = _a.password;
                        return [4 /*yield*/, model.authenticate(username, password)];
                    case 1:
                        user = _b.sent();
                        res.status(200).json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _b.sent();
                        res.status(400).json('User not authenticated!');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.UsersController = UsersController;
