/** @format */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// dotenv.config({
// 	path: path.resolve('./src/.env'), // remove this line in production
// 	debug: true, // remove this line in production
// });

import { server, app, wss, HOST, PORT } from './config';
import { connection } from './routers/io';

app.use('/public', express.static('./public'));
wss.on('connection', connection);

app.get('*', (req: Request, res: Response) => {
	return res.sendFile('./public/index.html', { root: './public ' });
});

server.listen(PORT, () => {
	console.log(`Server listening on http://${HOST}:${PORT}`);
});
