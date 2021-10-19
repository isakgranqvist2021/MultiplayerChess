"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.HOST = exports.wss = exports.server = exports.app = void 0;
var ws_1 = require("ws");
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
exports.app = express_1.default();
exports.server = http_1.createServer(exports.app);
exports.wss = new ws_1.WebSocketServer({ server: exports.server });
exports.HOST = process.env.NODE_HOST;
exports.PORT = process.env.NODE_PORT || process.env.PORT;
