/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from './shared';
import { ISocket, IRoom, IConnection, IRequest } from './shared';

export const refreshSocket = (uid: string, ws: WebSocket) => {
	let socket = sockets.find((s: ISocket) => s.userId === uid);

	if (!socket)
		return sockets.push({
			userId: uid,
			socket: ws,
		});

	return;
};

export const openRoom = (request: IRequest) => {
	const roles = ['white', 'black'];

	let connection: IConnection = {
		userId: request.uid,
		role: roles[Math.floor(Math.random() * roles.length)],
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
			...room,
		},
		false
	);
};

export const disbandRoom = (request: IRequest) => {
	let roomIndex = rooms.findIndex((r: IRoom) => r.id === request.rid);
	if (roomIndex < 0) return;

	return rooms.splice(roomIndex, 1);
};

export const syncRoom = (request: IRequest) => {
	let room = rooms.find((r: IRoom) => r.id === request.rid);
	if (!room) return;

	return broadcast(
		room,
		{
			type: request.type,
			...room,
		},
		false
	);
};

export const joinRoom = (request: IRequest) => {
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
	};

	room.connections.push(connection);
	return broadcast(
		room,
		{
			type: request.type,
			...room,
		},
		false
	);
};

export const playerMove = (request: IRequest) => {
	let room = rooms.find((r: IRoom) => r.id === request.rid);
	if (!room) return;
	return broadcast(
		room,
		{
			type: request.type,
			...request.payload,
		},
		false
	);
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
