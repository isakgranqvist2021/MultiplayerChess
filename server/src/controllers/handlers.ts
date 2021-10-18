/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from './shared';
import { ISocket, IRoom, IConnection, IRequest } from './shared';

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
	let s = sockets.filter((s: ISocket) => ids.includes(s.userId));
	let clients = s.map((s: ISocket) => s.socket);

	console.log('Broadcast', room, payload);

	clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload), { binary: isBinary });
		} else {
			console.log(`socket not open`);
		}
	});
};
