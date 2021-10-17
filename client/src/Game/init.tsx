/** @format */

import { images, active } from './settings';
import { Game } from 'js-chess-engine';
import { createBoard } from 'Game/board';

export const init = () => {
	let game = new Game();
	let pieces = createBoard();

	for (let k in game.board.configuration.pieces) {
		let piece = game.board.configuration.pieces[k];
		let img = new Image();
		img.src = `/pieces/${piece}.svg`;
		images[piece] = img;
	}

	for (let k in active) {
		active[k].src = `/pieces/green/${k}.svg`;
	}

	return {
		game,
		pieces,
	};
};
