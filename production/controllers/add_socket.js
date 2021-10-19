"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../store/shared");
exports.default = (function (uid, ws) {
    var socket = shared_1.sockets.find(function (s) { return s.userId === uid; });
    if (!socket)
        return shared_1.sockets.push({
            userId: uid,
            socket: ws,
        });
    if (!socket.socket.OPEN) {
        return (socket.socket = ws);
    }
});
