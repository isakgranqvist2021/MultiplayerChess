/** @format */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve('./src/.env'), // remove this line in production
	debug: true, // remove this line in production
});

import { server, app, wss, HOST, PORT } from './config';

server.listen(PORT, () => {
	console.log(`Server listening on http://${HOST}:${PORT}`);
});
