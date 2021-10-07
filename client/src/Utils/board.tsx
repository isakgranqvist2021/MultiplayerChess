/** @format */

import { Piece } from './piece';
import settings from './settings';
import { Square } from './square';

/*
	For each iteration increase x by the width of one square.
	If width is greater or equal to the width of the canvas
	then increase y by the height of one square and reset x to zero.
	Also, for every other row the colors should invert.
*/

export class Board {
	public squares: Square[] = [];
	public captured: { piece: Piece; color: string }[] = [];

	constructor() {
		this.create();
	}

	create() {
		let w: number = settings.w / settings.perRow;
		let h: number = settings.h / settings.perRow;
		let x: number = 0;
		let y: number = 0;

		for (let i = 0; i < settings.totalSquares; i++) {
			let color = settings.colors[0];

			let square = new Square({
				x: x,
				y: y,
				w: w,
				h: h,
				color: color,
				position: i,
			});

			x += w;

			if (x >= settings.w) {
				x = 0;
				y += h;
			} else {
				settings.colors.reverse();
			}

			this.squares.push(square);
		}
	}
}
