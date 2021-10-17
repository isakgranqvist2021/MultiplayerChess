/** @format */

import { settings } from './settings';

export const squareDimentions = (
	piece: Piece
): { x: number; y: number; w: number; h: number } => {
	let x =
		((piece.col - settings.indexOffset) * settings.w) / settings.totalCols;

	let y =
		((piece.row - settings.indexOffset) * settings.h) / settings.totalRows;

	let w = settings.w / settings.totalRows;
	let h = settings.h / settings.totalCols;

	return {
		x: x,
		y: y,
		w: w,
		h: h,
	};
};
