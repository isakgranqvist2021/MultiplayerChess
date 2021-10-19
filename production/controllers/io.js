"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var handlers_1 = require("./handlers");
var connection = function (ws) {
    ws.on('message', function (data, isBinary) {
        var request = JSON.parse(data.toString());
        handlers_1.addSocket(request.uid, ws);
        switch (request.type) {
            case 'open room':
                return handlers_1.openRoom(request, isBinary);
            case 'disband room':
                return handlers_1.disbandRoom(request, isBinary);
            case 'join room':
                return handlers_1.joinRoom(request, isBinary);
            case 'leave room':
                return handlers_1.leaveRoom(request, isBinary);
            case 'player move':
                return handlers_1.playerMove(request, isBinary);
            case 'reset user':
                return handlers_1.resetUser(request.uid, ws);
            default:
                return;
        }
    });
};
exports.connection = connection;
