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
    var room = shared_1.rooms.find(function (r) { return r.id === request.rid; });
    if (!room)
        return;
    return broadcast_1.default(room, __assign({ type: request.type, uid: request.uid }, request.payload), isBinary);
});
