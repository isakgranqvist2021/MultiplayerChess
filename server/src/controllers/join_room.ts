/** @format */

import { rooms } from '../store/shared';
import broadcast from './broadcast';

export default (request: IRequest, isBinary: boolean) => {
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
