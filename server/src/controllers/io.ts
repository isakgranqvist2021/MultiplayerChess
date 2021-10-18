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
	rid: string;
	uid: string;
}

export const connection = (ws: WebSocket) => {
	console.log('new connection');

	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: Request = JSON.parse(data.toString());

		refreshSocket(request.uid, ws);

		switch (request.type) {
			case 'open room':
				return openRoom(request.rid, request.uid, request.payload);
			case 'disband room':
				return disbandRoom(request.rid, request.uid, request.payload);
			case 'sync room':
				return syncRoom(request.rid, request.uid, request.payload);
			case 'join room':
				return joinRoom(request.rid, request.uid, request.payload);
		}
	});
};
