/** @format */

import { Piece } from './piece';
import { pawn, rook, knight, bishop, queen, king } from './movement';

import settings from './settings';

export const player = {
	color: 'white',
};

export let pieces: Piece[] = [];

export const setAvailable = (piece: any): number[] => {
	switch (piece.role) {
		case 'pawn':
			return pawn(piece);

		case 'rook':
			return rook(piece);

		case 'knight':
			return knight(piece);

		case 'bishop':
			return bishop(piece);

		case 'queen':
			return queen(piece);

		case 'king':
			return king(piece);

		default:
			return [];
	}
};

export function createPieces(): Piece[] {
	let tp = settings.totalSquares / 2; // total pieces

	let pieces = new Array(tp).fill(0).map((p: any, i: number) => {
		let role = 'pawn';

		let isRook = i === 0 || i === 7 || i === 24 || i === 31;
		let isKnight = i === 1 || i === 6 || i === 25 || i === 30;
		let isBishop = i === 2 || i === 5 || i === 26 || i === 29;
		let isQueen = i === 3 || i === 27;
		let isKing = i === 4 || i === 28;

		if (isRook) role = 'rook';
		if (isKnight) role = 'knight';
		if (isBishop) role = 'bishop';
		if (isQueen) role = 'queen';
		if (isKing) role = 'king';

		let piece = new Piece({
			color: i >= tp / 2 ? 'white' : 'black',
			role: role,
			position: i >= tp / 2 ? i + tp : i,
		});

		return piece;
	});

	return pieces.map((piece: Piece) => {
		piece.available = setAvailable({ ...piece, hasMoved: false });
		return piece;
	});
}

export function resetPieces() {
	pieces = createPieces();
}
