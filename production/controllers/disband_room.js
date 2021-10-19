"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../store/shared");
exports.default = (function (request, isBinary) {
    var roomIndex = shared_1.rooms.findIndex(function (r) { return r.id === request.rid; });
    if (roomIndex < 0)
        return;
    return shared_1.rooms.splice(roomIndex, 1);
});
