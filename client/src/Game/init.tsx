/** @format */

import { images, active } from './settings';
import { Game } from 'js-chess-engine';
import { createBoard } from 'Game/board';

let file_names: any = {
	// why is heroku not case sensetive ? '_'
	B: 'bishop_w.svg',
	K: 'king_w.svg',
	N: 'knight_w.svg',
	P: 'pawn_w.svg',
	Q: 'queen_w.svg',
	R: 'rook_w.svg',
	b: 'bishop_b.svg',
	k: 'king_b.svg',
	n: 'knight_b.svg',
	p: 'pawn_b.svg',
	q: 'queen_b.svg',
	r: 'rook_b.svg',
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
