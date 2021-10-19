/** @format */

import { rooms } from '../store/shared';
import broadcast from './broadcast';

export default (request: IRequest, isBinary: boolean) => {
	let room = rooms.find((r: IRoom) => r.id === request.rid);
	if (!room) return;

	room.connections.splice(
		room.connections.findIndex(
			(c: IConnection) => c.userId === request.uid
		),
		1
	);

	return broadcast(
		room,
		{
			type: 'leave room',
			connections: room.connections,
		},
		isBinary
	);
};
