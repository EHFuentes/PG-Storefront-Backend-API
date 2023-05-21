"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./routes/api"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
// enable cors for all routes
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/v1', api_1.default);
exports.default = app;
