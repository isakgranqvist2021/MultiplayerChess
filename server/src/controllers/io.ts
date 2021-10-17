/** @format */

import WebSocket from 'ws';

interface Request {
	type: string;
	payload: any;
	room?: string;
}

export const connection = (ws: WebSocket) => {
	ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
		let request: Request = JSON.parse(data.toString());

		switch (request.type) {
		}
	});
};
