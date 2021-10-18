/** @format */

import { rooms } from '../store/shared';

export default (request: IRequest, isBinary: boolean) => {
	let roomIndex = rooms.findIndex((r: IRoom) => r.id === request.rid);
	if (roomIndex < 0) return;

	return rooms.splice(roomIndex, 1);
};
