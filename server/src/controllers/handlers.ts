/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from './shared';
import { ISocket, IRoom, IConnection, IRequest } from './shared';

export const resetUser = (userId: string, ws: WebSocket) => {
	for (let i = 0; i < sockets.length; i++)
		if (sockets[i].userId === userId) sockets.splice(i, 1);

	for (let i = 0; i < rooms.length; i++) {
		for (let j = 0; j < rooms[i].connections.length; j++) {
			if (rooms[i].connections[j].userId === userId)
				rooms[i].connections.splice(j, 1);
		}
	}

	return addSocket(userId, ws);
};

export const addSocket = (uid: string, ws: WebSocket) => {
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

export const disbandRoom = (request: IRequest, isBinary: boolean) => {
	let roomIndex = rooms.findIndex((r: IRoom) => r.id === request.rid);
	if (roomIndex < 0) return;

	return rooms.splice(roomIndex, 1);
};

export const openRoom = (request: IRequest, isBinary: boolean) => {
	const roles = ['white', 'black'];

	let connection: IConnection = {
		userId: request.uid,
		role: roles[Math.floor(Math.random() * roles.length)],
		picture: request.payload.picture,
		nickname: request.payload.nickname,
	};

	let room = {
		id: request.rid,
		connections: [connection],
	};

	rooms.push(room);

	return broadcast(
		room,
		{
			type: request.type,
			uid: request.uid,
			...room,
		},
		isBinary
	);
};

export const joinRoom = (request: IRequest, isBinary: boolean) => {
	let room = rooms.find((r: IRoom) => r.id === request.rid);
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
		userId: request.uid,
		role: role,
		picture: request.payload.picture,
		nickname: request.payload.nickname,
	};

	room.connections.push(connection);

	return broadcast(
		room,
		{
			type: request.type,
			uid: request.uid,
			...room,
		},
		isBinary
	);
};

export const playerMove = (request: IRequest, isBinary: boolean) => {
	let room = rooms.find((r: IRoom) => r.id === request.rid);
	if (!room) return;
	return broadcast(
		room,
		{
			type: request.type,
			uid: request.uid,
			...request.payload,
		},
		isBinary
	);
};

export const broadcast = (room: IRoom, payload: any, isBinary: boolean) => {
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
