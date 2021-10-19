/** @format */

import { images, active } from './settings';
import { Game } from 'js-chess-engine';
import { createBoard } from 'Game/board';

let file_names: any = {
	// why is heroku not case sensetive ? '_'
	b: 'bishop_w.svg',
	k: 'king_w.svg',
	n: 'knight_w.svg',
	p: 'pawn_w.svg',
	q: 'queen_w.svg',
	r: 'rook_w.svg',
	B: 'bishop_b.svg',
	K: 'king_b.svg',
	N: 'knight_b.svg',
	P: 'pawn_b.svg',
	Q: 'queen_b.svg',
	R: 'rook_b.svg',
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
			process.env.REACT_APP_SERVER_ADDR + `/public/pieces/green/${k}.svg`;
	}

	return {
		game,
		pieces,
	};
};
