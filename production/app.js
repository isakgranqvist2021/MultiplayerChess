"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// dotenv.config({
// 	path: path.resolve('./src/.env'), // remove this line in production
// 	debug: true, // remove this line in production
// });
var config_1 = require("./config");
var io_1 = require("./routers/io");
config_1.app.use('/public', express_1.default.static('./public'));
config_1.wss.on('connection', io_1.connection);
config_1.app.get('*', function (req, res) {
    return res.sendFile('./public/index.html');
});
config_1.server.listen(config_1.PORT, function () {
    console.log("Server listening on http://" + config_1.HOST + ":" + config_1.PORT);
});
