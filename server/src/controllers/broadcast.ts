/** @format */

import { sockets } from '../store/shared';

export default (room: IRoom, payload: any, isBinary: boolean) => {
	let ids = room.connections.map((c: IConnection) => c.userId);
	let filtered = sockets.filter((s: ISocket) => ids.includes(s.userId));

	console.log('Broadcast', room, payload);

	for (let i = 0; i < filtered.length; i++) {
		if (filtered[i].socket.readyState === WebSocket.OPEN) {
			filtered[i].socket.send(JSON.stringify(payload), {
				binary: isBinary,
			});
		} else {
			console.log('Socket closed');
		}
	}
};
