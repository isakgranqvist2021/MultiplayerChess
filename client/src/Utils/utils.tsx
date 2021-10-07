/** @format */

import { Piece } from './piece';

export const setForBlack = (piece: any, pieces: Piece[]): number[] => {
	if (piece.role === 'pawn') {
	}

	return [];
};

export const setForWhite = (piece: any, pieces: Piece[]): number[] => {
	if (piece.role === 'pawn') {
		let moves = [piece.position - 8];
		if (!piece.hasMoved) moves.push(piece.position - 8 * 2);
		return moves;
	}

	return [];
};

export const setAvailable = (piece: any, pieces: Piece[]): number[] => {
	if (piece.color === 'white') return setForWhite(piece, pieces);
	if (piece.color === 'black') return setForBlack(piece, pieces);

	return [];
};
