/** @format */

import WebSocket from 'ws';

import {
	refreshSocket,
	openRoom,
	disbandRoom,
	syncRoom,
	joinRoom,
} from './handlers';

interface Request {
	type: string;
	payload: any;
	room: string;
	userId: string;
}

export const connection = (ws: WebSocket) => {
	console.log('new connection');

	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: Request = JSON.parse(data.toString());

		refreshSocket(request.userId, ws);

		switch (request.type) {
			case 'open room':
				return openRoom(request.room, request.userId, request.payload);
			case 'disband room':
				return disbandRoom(
					request.room,
					request.userId,
					request.payload
				);
			case 'sync room':
				return syncRoom(request.room, request.userId, request.payload);
			case 'join room':
				return joinRoom(request.room, request.userId, request.payload);
		}
	});
};
