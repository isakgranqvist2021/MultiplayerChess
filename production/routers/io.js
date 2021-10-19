"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var add_socket_1 = __importDefault(require("../controllers/add_socket"));
var open_room_1 = __importDefault(require("../controllers/open_room"));
var disband_room_1 = __importDefault(require("../controllers/disband_room"));
var join_room_1 = __importDefault(require("../controllers/join_room"));
var leave_room_1 = __importDefault(require("../controllers/leave_room"));
var player_move_1 = __importDefault(require("../controllers/player_move"));
var reset_user_1 = __importDefault(require("../controllers/reset_user"));
var sync_room_1 = __importDefault(require("../controllers/sync_room"));
var connection = function (ws) {
    ws.on('message', function (data, isBinary) {
        var request = JSON.parse(data.toString());
        // add socket to the sockets array or replace socket if it is closed
        add_socket_1.default(request.uid, ws);
        switch (request.type) {
            case 'open room':
                return open_room_1.default(request, isBinary);
            case 'disband room':
                return disband_room_1.default(request, isBinary);
            case 'join room':
                return join_room_1.default(request, isBinary);
            case 'leave room':
                return leave_room_1.default(request, isBinary);
            case 'sync room':
                return sync_room_1.default(request, isBinary);
            case 'player move':
                return player_move_1.default(request, isBinary);
            case 'reset user':
                return reset_user_1.default(request.uid, ws);
            default:
                return;
        }
    });
};
exports.connection = connection;
