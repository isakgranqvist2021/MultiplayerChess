/** @format */

import { Piece } from './piece';

export const setForBlack = (
	piece: any,
	pieces: Piece[],
	color: string
): number[] => {
	if (piece.role === 'pawn') {
	}

	return [];
};

const pawn = (pawn: any) => {
	const { piece, pieces, color } = pawn;

	let moves = [];

	let takeLeft = pieces.find(
		(p: Piece) => p.color !== color && p.position === piece.position - 8 - 1
	);

	let takeRight = pieces.find(
		(p: Piece) => p.color !== color && p.position === piece.position - 8 + 1
	);

	if (!piece.hasMoved) moves.push(piece.position - 8 * 2);
	if (takeLeft) moves.push(piece.position - 8 - 1);
	if (takeRight) moves.push(piece.position - 8 + 1);

	if (!pieces.find((p: Piece) => p.position === piece.position - 8))
		moves.push(piece.position - 8);

	return moves;
};

export const setForWhite = (
	piece: any,
	pieces: Piece[],
	color: string
): number[] => {
	switch (piece.role) {
		case 'pawn':
			return pawn({ piece, pieces, color });

		default:
			return [];
	}
};

export const setAvailable = (
	piece: any,
	pieces: Piece[],
	color: string
): number[] => {
	if (piece.color === 'white') return setForWhite(piece, pieces, color);
	if (piece.color === 'black') return setForBlack(piece, pieces, color);

	return [];
};
