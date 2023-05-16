"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.PORT = exports.HOST_ADDRESS = void 0;
const node_http_1 = __importDefault(require("node:http"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
_a = process.env, exports.HOST_ADDRESS = _a.HOST_ADDRESS, exports.PORT = _a.PORT;
const address = exports.HOST_ADDRESS + ':' + exports.PORT;
const server = node_http_1.default.createServer(app_1.default);
async function startServer() {
    server.listen(exports.PORT, () => {
        console.log(`Server is running on ${address}`);
    });
}
exports.startServer = startServer;
startServer();
exports.default = app_1.default;
