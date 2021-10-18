/** @format */

import WebSocket from 'ws';

import { IRequest } from './shared';

import {
	refreshSocket,
	openRoom,
	disbandRoom,
	syncRoom,
	joinRoom,
	playerMove,
} from './handlers';

export const connection = (ws: WebSocket) => {
	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: IRequest = JSON.parse(data.toString());

		refreshSocket(request.uid, ws);

		switch (request.type) {
			case 'open room':
				return openRoom(request);
			case 'disband room':
				return disbandRoom(request);
			case 'sync room':
				return syncRoom(request);
			case 'join room':
				return joinRoom(request);
			case 'player move':
				return playerMove(request);
		}
	});
};
