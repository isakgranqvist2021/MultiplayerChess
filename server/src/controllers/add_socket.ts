/** @format */

import WebSocket from 'ws';
import { sockets } from '../store/shared';

export default (uid: string, ws: WebSocket) => {
	let socket = sockets.find((s: ISocket) => s.userId === uid);

	if (!socket)
		return sockets.push({
			userId: uid,
			socket: ws,
		});

	if (!socket.socket.OPEN) {
		return (socket.socket = ws);
	}
};
