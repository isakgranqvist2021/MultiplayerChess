/** @format */

import { Settings } from './settings';
import { Square } from './square';

export interface IBoard {
	squares: Square[];
}

const colors: any[] = ['white', 'black'];

/*
	For each iteration increase x by the width of one square.
	If width is greater or equal to the width of the canvas
	then increase y by the height of one square and reset x to zero.
	Also, for every other row the colors should invert.
*/

export class Board {
	private totalSquares: number;
	private perRow: number;
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public squares: Square[];

	constructor(settings: Settings) {
		this.x = 0;
		this.y = 0;
		this.totalSquares = 64;
		this.perRow = 8;
		this.w = settings.w / this.perRow;
		this.h = settings.h / this.perRow;
		this.squares = [];
	}

	create(settings: Settings) {
		for (let i = 0; i < this.totalSquares; i++) {
			let color = colors[0];

			let square = new Square({
				x: this.x,
				y: this.y,
				w: this.w,
				h: this.h,
				color: color,
				position: i,
			});

			this.x += this.w;

			if (this.x >= settings.w) {
				this.x = 0;
				this.y += this.h;
			} else {
				colors.reverse();
			}

			this.squares.push(square);
		}
	}
}
