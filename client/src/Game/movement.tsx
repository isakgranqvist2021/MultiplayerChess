/** @format */

import settings from './settings';
import { Piece } from './piece';
import { pieces, player } from './global';

// ♙♙♙♙♙♙♙♙♙♙♙♙♙♙
export const pawn = (piece: any): number[] => {
	// only allow moves on pieces that has same color as player and that has not been captured
	let fp = pieces.filter((p: Piece) => {
		return !p.captured && p.color !== player.color;
	});

	let moves: number[] = [];
	let nWest = piece.position - settings.perRow - 1;
	let nEast = piece.position - settings.perRow + 1;

	let pieceAhead = fp.find((p: Piece) => p.position === piece.position - 8);
	let takeNWest = fp.find((p: Piece) => p.position === nWest);
	let takeNEast = fp.find((p: Piece) => p.position === nEast);

	if (!piece.hasMoved) moves.push(piece.position - settings.perRow * 2);
	if (takeNWest) moves.push(nWest);
	if (takeNEast && nEast > 0) moves.push(nEast);
	if (!pieceAhead) moves.push(piece.position - settings.perRow);

	return moves;
};

// ♖♖♖♖♖♖♖♖♖♖♖♖♖♖
export const rook = (piece: any): number[] => {
	// rook can move any x, y direction as long as it does not collide with a piece,
	// if it collides with a piece it will capture it.

	let position: number = piece.position;
	let moves: number[] = [];
	let y: number[] = [];
	let x: number[] = [];

	let col = position % settings.perRow;
	let yEnd = settings.totalSquares - settings.perRow + col;
	let pos = yEnd;

	for (let i = yEnd; i >= col; i--) {
		if (pos >= col) y.unshift(pos);
		pos -= 8;
	}

	let r = Math.floor(position / 8) * 8;
	for (let i = r; i < r + 8; i++) {
		if (i <= r + 8) x.push(i);
	}

	// if any y or x value collied with a piece then exclude further positions
	return [...y, ...x];
};

// ♘♘♘♘♘♘♘♘♘♘♘♘♘♘
export const knight = (piece: any): number[] => {
	let moves: number[] = [];
	return moves;
};

// ♗♗♗♗♗♗♗♗♗♗♗♗♗♗
export const bishop = (piece: any): number[] => {
	let moves: number[] = [];
	return moves;
};

// ♕♕♕♕♕♕♕♕♕♕♕♕♕♕
export const queen = (piece: any): number[] => {
	let moves: number[] = [];
	return moves;
};

// ♔♔♔♔♔♔♔♔♔♔♔♔♔♔
export const king = (piece: any): number[] => {
	let moves: number[] = [];
	return moves;
};
