/** @format */

import { Settings } from './settings';

export class Square {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public color: string;
	public position: number;
	private settings: Settings;

	constructor(square: any, settings: Settings) {
		this.x = square.x;
		this.y = square.y;
		this.w = square.w;
		this.h = square.h;
		this.color = square.color;
		this.position = square.position;
		this.settings = settings;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color === 'black' ? '#e37046' : '#fff';
		ctx.fillRect(this.x, this.y, this.w, this.h);

		if (this.settings.debug) {
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
