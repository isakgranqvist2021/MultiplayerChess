/** @format */

import { settings } from './settings';

const getLetter = (col: number) => {
	switch (col) {
		case 1:
			return 'A';
		case 2:
			return 'B';
		case 3:
			return 'C';
		case 4:
			return 'D';
		case 5:
			return 'E';
		case 6:
			return 'F';
		case 7:
			return 'G';
		case 8:
			return 'H';

		default:
			throw Error('invalid');
	}
};

export const createBoard = (): Piece[] => {
	const squares: Piece[] = [];
	const colors = ['white', 'black'];

	for (let i = 0; i < settings.totalSquares; i++) {
		let col = Math.floor(i % settings.totalCols);
		let row = Math.floor(i / settings.totalRows) + 1;
		let symbol = getLetter(col + 1) + row;

		let color = colors[0];
		if (i % 8 === 0) colors.reverse();
		if (i % 2 === 0) color = colors[1];

		let square = {
			square: i + 1,
			col: col + 1,
			row: row,
			symbol: symbol,
			color: color,
		};

		squares.push(square);
	}

	return squares;
};
