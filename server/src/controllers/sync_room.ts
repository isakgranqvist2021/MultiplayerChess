/** @format */

import { rooms } from '../store/shared';
import broadcast from './broadcast';

export default (request: IRequest, isBinary: boolean) => {
	let room = rooms.find((r: IRoom) => r.id === request.rid);
	if (!room) return;

	return broadcast(
		room,
		{
			type: 'sync room',
			uid: request.uid,
			history: request.payload,
		},
		isBinary
	);
};
