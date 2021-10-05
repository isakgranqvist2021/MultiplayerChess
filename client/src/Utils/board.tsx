/** @format */

import { settings } from './settings';
import { ISquare } from './types';

const colors = ['white', 'black'];

export const createBoard = (): ISquare[] => {
	const board: ISquare[] = [];
	let squares: number = 64;
	let perRow: number = 8;
	let x = 0;
	let y = 0;

	for (let i = 0; i < squares; i++) {
		let width = settings.width / perRow;
		let height = settings.height / perRow;
		let color = colors[0];

		let square: ISquare = {
			x: x,
			y: y,
			w: width,
			h: height,
			color: color,
			square: i,
		};

		x += width;

		if (x >= settings.width) {
			x = 0;
			y += height;
		} else {
			colors.reverse();
		}

		board.push(square);
	}

	return board;
};
