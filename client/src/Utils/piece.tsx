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
	public img_path: string;
	public img: HTMLImageElement | null;
	private allowRender: boolean = false;

	constructor(piece: {
		role: string;
		color: 'black' | 'white';
		position: number;
	}) {
		this.role = piece.role;
		this.color = piece.color;
		this.position = piece.position;
		this.img_path = `${process.env.PUBLIC_URL}/${this.role}_${this.color}`;
		this.img = new Image();
		this.img.src = this.img_path;
		this.allowRender = false;

		this.img.onload = () => {
			console.log(this.img);
			if (this.img) {
				this.allowRender = true;
			}
		};
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (this.allowRender && this.img !== null) {
			ctx.drawImage(this.img, 0, 0);
			ctx.beginPath();
			ctx.moveTo(30, 96);
			ctx.lineTo(70, 66);
			ctx.lineTo(103, 76);
			ctx.lineTo(170, 15);
			ctx.stroke();
		}
	}
}
