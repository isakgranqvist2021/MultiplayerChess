"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var shared_1 = require("../store/shared");
exports.default = (function (room, payload, isBinary) {
    var ids = room.connections.map(function (c) { return c.userId; });
    var filtered = shared_1.sockets.filter(function (s) { return ids.includes(s.userId); });
    for (var i = 0; i < filtered.length; i++) {
        if (filtered[i].socket.readyState === ws_1.default.OPEN) {
            filtered[i].socket.send(JSON.stringify(payload), {
                binary: isBinary,
            });
        }
        else {
            console.log('Socket closed');
        }
    }
});
