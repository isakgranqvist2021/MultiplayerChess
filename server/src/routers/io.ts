/** @format */

import WebSocket from 'ws';

import add_socket from '../controllers/add_socket';
import open_room from '../controllers/open_room';
import disband_room from '../controllers/disband_room';
import join_room from '../controllers/join_room';
import leave_room from '../controllers/leave_room';
import player_move from '../controllers/player_move';
import reset_user from '../controllers/reset_user';

export const connection = (ws: WebSocket) => {
	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: IRequest = JSON.parse(data.toString());

		add_socket(request.uid, ws);

		switch (request.type) {
			case 'open room':
				return open_room(request, isBinary);
			case 'disband room':
				return disband_room(request, isBinary);
			case 'join room':
				return join_room(request, isBinary);
			case 'leave room':
				return leave_room(request, isBinary);
			case 'player move':
				return player_move(request, isBinary);
			case 'reset user':
				return reset_user(request.uid, ws);
			default:
				return;
		}
	});
};
