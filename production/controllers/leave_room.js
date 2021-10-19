"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../store/shared");
var broadcast_1 = __importDefault(require("./broadcast"));
exports.default = (function (request, isBinary) {
    var room = shared_1.rooms.find(function (r) { return r.id === request.rid; });
    if (!room)
        return;
    room.connections.splice(room.connections.findIndex(function (c) { return c.userId === request.uid; }), 1);
    return broadcast_1.default(room, {
        type: 'leave room',
        connections: room.connections,
    }, isBinary);
});
