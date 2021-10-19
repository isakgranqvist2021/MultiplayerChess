"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../store/shared");
var add_socket_1 = __importDefault(require("./add_socket"));
exports.default = (function (userId, ws) {
    for (var i = 0; i < shared_1.sockets.length; i++)
        if (shared_1.sockets[i].userId === userId)
            shared_1.sockets.splice(i, 1);
    for (var i = 0; i < shared_1.rooms.length; i++) {
        for (var j = 0; j < shared_1.rooms[i].connections.length; j++) {
            if (shared_1.rooms[i].connections[j].userId === userId)
                shared_1.rooms[i].connections.splice(j, 1);
        }
    }
    return add_socket_1.default(userId, ws);
});
