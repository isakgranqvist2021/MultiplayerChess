/** @format */

import WebSocket from 'ws';

import { IRequest } from './shared';

import {
	addSocket,
	openRoom,
	disbandRoom,
	joinRoom,
	playerMove,
	resetUser,
} from './handlers';

export const connection = (ws: WebSocket) => {
	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: IRequest = JSON.parse(data.toString());

		addSocket(request.uid, ws);

		switch (request.type) {
			case 'open room':
				return openRoom(request, isBinary);
			case 'disband room':
				return disbandRoom(request, isBinary);
			case 'join room':
				return joinRoom(request, isBinary);
			case 'player move':
				return playerMove(request, isBinary);
			case 'reset user':
				return resetUser(request.uid, ws);
			default:
				return;
		}
	});
};
