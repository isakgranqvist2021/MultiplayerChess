"use strict";
/** @format */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../store/shared");
var broadcast_1 = __importDefault(require("./broadcast"));
exports.default = (function (request, isBinary) {
    var roles = ['white', 'black'];
    var connection = {
        userId: request.uid,
        role: roles[Math.floor(Math.random() * roles.length)],
        picture: request.payload.picture,
        nickname: request.payload.nickname,
    };
    var room = {
        id: request.rid,
        connections: [connection],
    };
    shared_1.rooms.push(room);
    return broadcast_1.default(room, __assign({ type: request.type, uid: request.uid }, room), isBinary);
});
