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
var database_1 = __importDefault(require("../../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get the salt rounds from the environment variables
var _a = process.env, saltRounds = _a.saltRounds, pepper = _a.pepper;
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    // Get all users
    UsersController.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users_table;';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        // if no results, throw error
                        if (results.rows.length === 0) {
                            throw new Error();
                        }
                        else {
                            conn.release();
                            return [2 /*return*/, results.rows];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Get user by id
    UsersController.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users_table WHERE id=($1);';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length === 0) {
                            throw new Error();
                        }
                        else {
                            conn.release();
                            return [2 /*return*/, result.rows[0]];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.checkUsernameExists = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT username FROM users_table WHERE username = $1';
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows.length > 0];
                }
            });
        });
    };
    // Create new user function to add to database
    UsersController.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, hash, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, this.checkUsernameExists(user.username)];
                    case 2:
                        if (_a.sent()) {
                            throw new Error('Username already taken');
                        }
                        sql = 'INSERT INTO users_table (first_name, last_name, username, user_password) VALUES($1, $2, $3, $4) RETURNING *';
                        hash = bcrypt_1.default.hashSync(user.user_password + pepper, Number(saltRounds));
                        return [4 /*yield*/, conn.query(sql, [
                                user.first_name,
                                user.last_name,
                                user.username,
                                hash,
                            ])];
                    case 3:
                        result = _a.sent();
                        if (result.rows.length === 0) {
                            throw new Error('Could not create user');
                        }
                        else {
                            conn.release();
                            return [2 /*return*/, result.rows[0]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT user_password FROM users_table WHERE username=($1);';
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        // If the user exists, return the user object (without the password) else return null
                        try {
                            if (result.rows.length) {
                                user = result.rows[0];
                                hash = bcrypt_1.default.hashSync(password, Number(saltRounds));
                                if (bcrypt_1.default.compareSync(password, hash)) {
                                    return [2 /*return*/, user];
                                }
                            }
                            return [2 /*return*/, null];
                        }
                        catch (err) {
                            throw new Error("Could not authenticate user ".concat(username, ". Error: ").concat(err));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.UsersController = UsersController;
