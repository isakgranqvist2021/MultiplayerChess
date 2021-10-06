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

let drawState = 0;

interface IPiece {
	role: string;
	color: 'black' | 'white';
	position: number;
}

export class Piece {
	public role: string;
	public position = 0;
	public color: string;
	public img_path: string = '';
	public img: HTMLImageElement | null = null;
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

	draw(ctx: CanvasRenderingContext2D): void {
		this.row = Math.floor(this.position / 8);
		this.col = Math.floor(this.position / 8);

		console.log(this.position);

		if (this.img) {
			ctx.drawImage(this.img, this.col * 125, this.row * 125);

			drawState++;
		}
	}
}
