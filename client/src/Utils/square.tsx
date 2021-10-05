/** @format */

import { Piece } from './piece';

export class Square {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public color: 'black' | 'white';
	public position: number;

	constructor(square: any) {
		this.x = square.x;
		this.y = square.y;
		this.w = square.w;
		this.h = square.h;
		this.color = square.color;
		this.position = square.position;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}
