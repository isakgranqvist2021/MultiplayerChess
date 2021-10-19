/** @format */

import { images, active } from './settings';
import { Game } from 'js-chess-engine';
import { createBoard } from 'Game/board';

const loadImages = (pieces: any) => {
	for (let k in pieces) {
		let piece = pieces[k];
		let img = new Image();
		img.src = process.env.REACT_APP_SERVER_ADDR + `/pieces/${piece}.svg`;
		images[piece] = img;
	}

	for (let k in active) {
		active[k].src =
			process.env.REACT_APP_SERVER_ADDR + `/pieces/green/${k}.svg`;
	}
};

export const init = () => {
	let game = new Game();
	let pieces = createBoard();

	loadImages(game.board.configuration.pieces);

	return {
		game,
		pieces,
	};
};
