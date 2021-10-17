/** @format */

import WebSocket from 'ws';

import { openRoom, disbandRoom, syncRoom, joinRoom } from './handlers';
import { rooms, sockets } from './shared';

interface Request {
	type: string;
	payload: any;
	room: string;
}

export const connection = (ws: WebSocket) => {
	console.log('new connection');

	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: Request = JSON.parse(data.toString());

		switch (request.type) {
			case 'open room':
				return openRoom(request.room, request.payload);
			case 'disband room':
				return disbandRoom(request.room, request.payload);
			case 'sync room':
				return syncRoom(request.room, request.payload);
			case 'join room':
				return joinRoom(request.room, request.payload);
		}
	});
};
