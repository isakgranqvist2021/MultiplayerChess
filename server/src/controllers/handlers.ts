/** @format */

import WebSocket from 'ws';
import { rooms, sockets } from './shared';
import { ISocket, IRoom, IConnection } from './shared';

export const refreshSocket = (userId: string, ws: WebSocket) => {
	let socket = sockets.find((s: ISocket) => s.userId === userId);

	if (!socket)
		return sockets.push({
			userId: userId,
			socket: ws,
		});

	return (socket.socket = ws);
};

export const openRoom = (room: string, userId: string, payload: any) => {};

export const disbandRoom = (room: string, userId: string, payload: any) => {};

export const syncRoom = (room: string, userId: string, payload: any) => {};

export const joinRoom = (room: string, userId: string, payload: any) => {};
