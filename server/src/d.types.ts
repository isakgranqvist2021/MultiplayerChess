/** @format */

interface IConnection {
	userId: string; // should map to a Socket
	role: string; // spectator / white / black
	picture?: string;
	nickname?: string;
}

interface IRoom {
	id: string;
	connections: IConnection[];
}

interface IRequest {
	type: string;
	payload: any;
	rid: string;
	uid: string;
}

interface ISocket {
	userId: string; // should map to a connection if player is in a game
	socket: import('ws').WebSocket;
}
