/** @format */

import { Square } from './square';

/*
	total pieces = 32
*/

export const pieces: any[] = [
	{ role: 'rook' },
	{ role: 'knight' },
	{ role: 'bishop' },
	{ role: 'queen' },
	{ role: 'king' },
	{ role: 'bishop' },
	{ role: 'knight' },
	{ role: 'rook' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },

	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },
	{ role: 'empty' },

	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'pawn' },
	{ role: 'rook' },
	{ role: 'knight' },
	{ role: 'bishop' },
	{ role: 'queen' },
	{ role: 'king' },
	{ role: 'bishop' },
	{ role: 'knight' },
	{ role: 'rook' },
];

export class Piece {
	public role: string;
	public position = 0;
	public color: string;
	public img_path: string = '';
	public img: HTMLImageElement | null = null;
	private row: number = 0;

	constructor(piece: {
		role: string;
		color: 'black' | 'white';
		position: number;
	}) {
		this.role = piece.role;
		this.color = piece.color;
		this.position = piece.position;
		this.img_path = `/pieces/${this.role}_${this.color}.svg`;

		this.img = new Image();
		this.img.src = this.img_path;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.row = Math.floor(this.position / 8);

		if (this.img) {
			ctx.drawImage(this.img, 25, this.row * 100 + 25);
		}
	}
}
