/** @format */

interface ISettings {
	totalSquares: number;
	totalRows: number;
	totalCols: number;
	w: number;
	h: number;
	pw: number;
	ph: number;
	indexOffset: number;
}

export let settings: ISettings = {
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

export let images: any = {
	b: new Image(),
	k: new Image(),
	n: new Image(),
	p: new Image(),
	q: new Image(),
	r: new Image(),
	B: new Image(),
	K: new Image(),
	N: new Image(),
	P: new Image(),
	Q: new Image(),
	R: new Image(),
};

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

export const setSettings = (newSettings: ISettings) => (settings = newSettings);
