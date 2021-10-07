/** @format */

import settings from './settings';

export class Square {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public color: string;
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
		let fillColor = this.color === 'black' ? '#e37046' : '#fff';

		ctx.fillStyle = fillColor;
		ctx.fillRect(this.x, this.y, this.w, this.h);

		if (settings.debug) {
			ctx.fillStyle = this.color === 'black' ? '#fff' : '#e37046';
			ctx.font = '16px Arial';
			ctx.fillText(
				this.position.toString(),
				this.x + 50 - 12,
				this.y + 100 - 12.5
			);
		}
	}
}
