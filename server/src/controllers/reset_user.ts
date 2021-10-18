/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from '../store/shared';
import add_socket from './add_socket';

export default (userId: string, ws: WebSocket) => {
	for (let i = 0; i < sockets.length; i++)
		if (sockets[i].userId === userId) sockets.splice(i, 1);

	for (let i = 0; i < rooms.length; i++) {
		for (let j = 0; j < rooms[i].connections.length; j++) {
			if (rooms[i].connections[j].userId === userId)
				rooms[i].connections.splice(j, 1);
		}
	}

	return add_socket(userId, ws);
};
