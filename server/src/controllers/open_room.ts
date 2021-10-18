/** @format */

import { rooms } from '../store/shared';
import broadcast from './broadcast';

export default (request: IRequest, isBinary: boolean) => {
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
