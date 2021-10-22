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

export const colors = ['#ffffff', '#caa2eb'];
export let selectedPiece: any = null;
export let availableMoves: any[] = [];
export const aw = '#32a852';
export const ab = '#324ea8';

export let images: IMGDict = {
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

export let active: IMGDict = {
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

const getBoardDim = (): { x: number; y: number; pz: number } => {
	const w = window.innerWidth - 17;
	if (w >= 900) {
		return {
			x: 800,
			y: 800,
			pz: 30,
		};
	} else if (w < 900 && w >= 750) {
		return {
			x: 700,
			y: 700,
			pz: 20,
		};
	} else if (w < 750 && w >= 600) {
		return {
			x: 550,
			y: 550,
			pz: 10,
		};
	} else {
		return {
			x: 400,
			y: 400,
			pz: 3,
		};
	}
};

export let settings: ISettings = {
	totalSquares: 64,
	totalRows: 8,
	totalCols: 8,
	w: getBoardDim().x,
	h: getBoardDim().y,
	pw: getBoardDim().pz,
	ph: getBoardDim().pz,
	indexOffset: 1,
};

export const reloadSettings = () => {
	let gbd = getBoardDim();
	settings.w = gbd.x;
	settings.h = gbd.y;
	settings.pw = gbd.pz;
	settings.ph = gbd.pz;
};

export const setAvailableMoves = (newState: string[]) =>
	(availableMoves = newState);

export const setSelectedPiece = (piece: Piece | null) =>
	(selectedPiece = piece);

export const setSettings = (newSettings: ISettings) => (settings = newSettings);
