"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../services/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get the salt rounds from the environment variables
const { saltRounds, pepper } = process.env;
class UsersModel {
    // Get all users
    async index() {
        // Connect to database
        const conn = await database_1.default.connect();
        // Query database
        const sql = 'SELECT * FROM users_table;';
        // Get results
        const results = await conn.query(sql);
        // if no results, throw error
        if (results.rows.length === 0) {
            throw new Error();
        }
        else {
            conn.release();
            return results.rows;
        }
    }
    // Get user by id
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users_table WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            if (result.rows.length === 0) {
                throw new Error();
            }
            else {
                conn.release();
                return result.rows[0];
            }
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async checkUsernameExists(username) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT username FROM users_table WHERE username = $1';
        const result = await conn.query(sql, [username]);
        conn.release();
        return result.rows.length > 0;
    }
    // Create new user function to add to database
    async create(user) {
        const conn = await database_1.default.connect();
        if (await this.checkUsernameExists(user.username)) {
            throw new Error('Username already taken');
        }
        const sql = 'INSERT INTO users_table (first_name, last_name, username, user_password) VALUES($1, $2, $3, $4) RETURNING *';
        const hash = bcrypt_1.default.hashSync(user.user_password + pepper, Number(saltRounds));
        const result = await conn.query(sql, [
            user.first_name.toLowerCase(),
            user.last_name.toLowerCase(),
            user.username.toLowerCase(),
            hash,
        ]);
        if (result.rows.length === 0) {
            throw new Error('Could not create user');
        }
        else {
            conn.release();
            return result.rows[0];
        }
    }
    async authenticate(username, password) {
        try {
            if (!username.trim() || !password.trim()) {
                throw new Error('Username and password must not be empty');
            }
            const conn = await database_1.default.connect();
            const sql = 'SELECT user_password FROM users_table WHERE username=($1);';
            const result = await conn.query(sql, [username]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                const hash = bcrypt_1.default.hashSync(password, Number(saltRounds));
                if (bcrypt_1.default.compareSync(password, hash)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
        }
    }
}
exports.UsersModel = UsersModel;
