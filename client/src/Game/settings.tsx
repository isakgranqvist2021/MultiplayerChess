/** @format */

export const settings = {
	totalSquares: 64,
	totalRows: 8,
	totalCols: 8,
	w: 800,
	h: 800,
	pw: 30,
	ph: 30,
	indexOffset: 1,
};

export const colors = ['#ffffff', '#7621a3'];
export let selectedPiece: any = null;
export let availableMoves: any[] = [];
export const aw = '#32a852';
export const ab = '#324ea8';
export let images: any = {};
export let active: any = {
	b: new Image(),
	k: new Image(),
	n: new Image(),
	p: new Image(),
	q: new Image(),
	r: new Image(),
};

export const setAvailableMoves = (newState: string[]) =>
	(availableMoves = newState);

export const setSelectedPiece = (piece: Piece | null) =>
	(selectedPiece = piece);
