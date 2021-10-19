"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = exports.rooms = void 0;
/*
    A room is essentially like a game just with some extra stuff
    a room is created when a new game starts and disbanded when a game ends
    
    [id]
    is a generated string

    [connections]
    is an array of connections.
    Has to contain at least one connection otherwise the room should be disbanded.
    When the room is created the creator will be assigned a role which is at random
*/
exports.rooms = [];
/*
    All sockets that are connected to the application
    will be stored in the sockets array which can then be accessed and broadcasted to.
*/
exports.sockets = [];
