/** @format */

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

interface IPiece {
	role: string;
	color: 'black' | 'white';
	position: number;
}

const setAvailable = (role: string) => {};

export class Piece {
	public role: string;
	public position = 0;
	public color: string;
	public img_path: string = '';
	public img: HTMLImageElement | null = null;
	public hasMoved: boolean = false;
	public captured: boolean = false;

	public available: number[] = [];

	private row: number = 0;
	private col: number = 0;

	constructor(piece: IPiece) {
		this.role = piece.role;
		this.color = piece.color;
		this.position = piece.position;
		this.img_path = `/pieces/${this.role}_${this.color}.svg`;
		this.img = new Image();
		this.img.src = this.img_path;
	}

	move(to: number) {
		if (this.available.includes(to)) {
			this.position = to;
			this.hasMoved = true;
		}
	}

	capture(pieces: Piece[], index: number): boolean {
		if (index >= 0) {
			pieces.splice(index, 1);
			return true;
		}

		return false;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		if (!this.captured) {
			this.row = Math.floor(this.position / 8);
			this.col = this.position % 8;

			if (this.img) {
				ctx.drawImage(
					this.img,
					this.col * 100 + 25,
					this.row * 100 + 25
				);
			}
		}
	}
}
