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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (request, isBinary) {
    var room = rooms.find(function (r) { return r.id === request.rid; });
    if (!room)
        return;
    return broadcast(room, __assign({ type: request.type, uid: request.uid }, request.payload), isBinary);
});
