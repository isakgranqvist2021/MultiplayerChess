/** @format */

import { images, active } from './settings';
import { Game } from 'js-chess-engine';
import { createBoard } from 'Game/board';

export const init = () => {
	let game = new Game();
	let pieces = createBoard();

	for (let k in images) {
		images[k].src =
			process.env.REACT_APP_SERVER_ADDR + `/public/pieces/${k}.svg`;
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
