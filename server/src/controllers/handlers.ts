/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from './shared';
import { ISocket, IRoom, IConnection } from './shared';

export const refreshSocket = (uid: string, ws: WebSocket) => {
	let socket = sockets.find((s: ISocket) => s.userId === uid);

	if (!socket)
		return sockets.push({
			userId: uid,
			socket: ws,
		});

	return (socket.socket = ws);
};

export const openRoom = (rid: string, uid: string, payload: any) => {
	const roles = ['white', 'black'];

	let connection: IConnection = {
		userId: uid,
		role: roles[Math.floor(Math.random() * roles.length)],
	};

	return rooms.push({
		id: rid,
		connections: [connection],
		game: {},
	});
};

export const disbandRoom = (rid: string, uid: string, payload: any) => {
	let roomIndex = rooms.findIndex((r: IRoom) => r.id === rid);
	if (roomIndex < 0) return;

	return rooms.splice(roomIndex, 1);
};

export const syncRoom = (rid: string, uid: string, payload: any) => {
	let room = rooms.find((r: IRoom) => r.id === rid);
	if (!room) return;

	return (room.game = payload.game);
};

export const joinRoom = (rid: string, uid: string, payload: any) => {
	let room = rooms.find((r: IRoom) => r.id === rid);
	if (!room) return;
	let role = 'white';

	if (
		room.connections.some((c: IConnection) => {
			return c.role === 'white';
		})
	) {
		role = 'black';
	}

	let connection: IConnection = {
		userId: uid,
		role: role,
	};

	return room.connections.push(connection);
};

export const broadcast = (room: IRoom, payload: any, isBinary: boolean) => {
	const clients: WebSocket[] = [];

	room.connections.forEach((c: IConnection) => {
		let socket = sockets.find((s: ISocket) => s.userId === c.userId);
		if (socket) clients.push(socket.socket);
	});

	clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload), { binary: isBinary });
		}
	});
};
