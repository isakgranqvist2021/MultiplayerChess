/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from './shared';
import { ISocket, IRoom, IConnection, IRequest } from './shared';

const removePrevConns = (uid: string) => {
	rooms.forEach((r: IRoom) => {
		let i = r.connections.findIndex((c: IConnection) => c.userId === uid);
		if (i >= 0) r.connections.splice(i, 1);
	});
};

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
	// removePrevConns(request.uid);

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
	console.log(rooms);

	return broadcast(
		room,
		{
			type: request.type,
			uid: request.uid,
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
			uid: request.uid,
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
			uid: request.uid,
			...request.payload,
		},
		false
	);
};

export const broadcast = (room: IRoom, payload: any, isBinary: boolean) => {
	let ids = room.connections.map((c: IConnection) => c.userId);
	let s = sockets.filter((s: ISocket) => ids.includes(s.userId));
	let clients = s.map((s: ISocket) => s.socket);

	clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload), { binary: isBinary });
		}
	});
};
