"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = exports.server = exports.app = void 0;
var http_1 = __importDefault(require("http"));
var ws_1 = require("ws");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
exports.app = app;
var server = http_1.default.createServer(app);
exports.server = server;
var wss = new ws_1.WebSocketServer({ server: server });
exports.wss = wss;
