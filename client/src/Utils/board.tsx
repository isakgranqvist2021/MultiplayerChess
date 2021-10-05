/** @format */

import { Settings } from './settings';
import { Square } from './square';

/*
	For each iteration increase x by the width of one square.
	If width is greater or equal to the width of the canvas
	then increase y by the height of one square and reset x to zero.
	Also, for every other row the colors should invert.
*/

export class Board {
	private totalSquares: number;
	private perRow: number;
	public squares: Square[];
	private colors: any[];

	constructor(settings: Settings) {
		this.colors = settings.colors;
		this.totalSquares = 64;
		this.perRow = 8;
		this.squares = [];
		this.create(settings);
	}

	create(settings: Settings) {
		let w: number = settings.w / this.perRow;
		let h: number = settings.h / this.perRow;
		let x: number = 0;
		let y: number = 0;

		for (let i = 0; i < this.totalSquares; i++) {
			let color = this.colors[0];

			let square = new Square(
				{
					x: x,
					y: y,
					w: w,
					h: h,
					color: color,
					position: i,
				},
				settings
			);

			x += w;

			if (x >= settings.w) {
				x = 0;
				y += h;
			} else {
				this.colors.reverse();
			}

			this.squares.push(square);
		}
	}
}
