/** @format */

import settings from './settings';

export class Piece {
	public role: string;
	public color: string;
	public position: number = 0;
	public selected: boolean = false;

	public img: HTMLImageElement | null = null;
	public src: string;

	public hasMoved: boolean = false;
	public captured: boolean = false;

	public available: number[] = [];
	public captures: Piece[] = [];

	constructor(piece: any) {
		this.role = piece.role;
		this.color = piece.color;
		this.position = piece.position;

		this.img = new Image(settings.pieceWidth, settings.pieceHeight);
		this.src = this.imgSrc();
		this.img.src = this.src;
	}

	move(to: number) {
		if (this.available.includes(to)) {
			this.position = to;
			this.hasMoved = true;
			this.selected = false;
		}
	}

	capture(piece: Piece) {
		if (this.available.includes(piece.position)) {
			piece.captured = true;
			this.captures.push(piece);
		}
	}

	imgSrc(): string {
		if (this.selected) {
			return '/pieces/green' + '_' + this.role + '.svg';
		} else {
			return '/pieces/' + this.color + '_' + this.role + '.svg';
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (this.captured) return;

		let row = Math.floor(this.position / settings.perRow);
		let col = this.position % settings.perCol;

		if (this.img) {
			let dx = col * settings.squareWidth + settings.pieceWidth / 2 + 5;
			let dy = row * settings.squareHeight + settings.pieceHeight / 2 + 5;

			this.img.src = this.imgSrc();
			ctx.drawImage(this.img, dx, dy);
		}
	}
}
