/** @format */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve('./src/.env'), // remove this line in production
	debug: true, // remove this line in production
});

import { server, wss, HOST, PORT } from './config';
import { connection } from './controllers/io';

wss.on('connection', connection);

server.listen(PORT, () => {
	console.log(`Server listening on http://${HOST}:${PORT}`);
});
