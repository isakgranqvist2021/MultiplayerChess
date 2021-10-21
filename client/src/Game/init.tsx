/** @format */

import { images, active } from './settings';
import { Game } from 'js-chess-engine';
import { createBoard } from 'Game/board';

const fileExt = 'png';

let file_names: any = {
	// why is heroku not case sensetive ? '_'
	B: 'bishop_w.' + fileExt,
	K: 'king_w.' + fileExt,
	N: 'knight_w.' + fileExt,
	P: 'pawn_w.' + fileExt,
	Q: 'queen_w.' + fileExt,
	R: 'rook_w.' + fileExt,
	b: 'bishop_b.' + fileExt,
	k: 'king_b.' + fileExt,
	n: 'knight_b.' + fileExt,
	p: 'pawn_b.' + fileExt,
	q: 'queen_b.' + fileExt,
	r: 'rook_b.' + fileExt,
};

export const init = () => {
	let game = new Game();
	let pieces = createBoard();

	for (let k in images) {
		images[k].src =
			process.env.REACT_APP_SERVER_ADDR +
			`/public/pieces/${file_names[k]}`;
	}

	for (let k in active) {
		active[k].src =
			process.env.REACT_APP_SERVER_ADDR +
			`/public/pieces/active_${file_names[k]}`;
	}

	return {
		game,
		pieces,
	};
};
