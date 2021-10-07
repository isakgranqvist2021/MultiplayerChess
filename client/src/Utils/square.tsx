/** @format */

import settings from './settings';

export class Square {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public color: string;
	public position: number;
	public selected: boolean = false;

	constructor(square: any) {
		this.x = square.x;
		this.y = square.y;
		this.w = square.w;
		this.h = square.h;
		this.color = square.color;
		this.position = square.position;
	}

	draw(ctx: CanvasRenderingContext2D, available: number[]): void {
		let fillColor = this.color === 'black' ? '#e37046' : '#fff';

		if (this.selected) {
			fillColor = '#415245';
		}

		if (available.includes(this.position)) {
			fillColor = '#a4e08d';
		}

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
