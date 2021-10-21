/** @format */

/// <reference types="react-scripts" />
declare module 'js-chess-engine';

interface Piece {
	square: number;
	col: number;
	row: number;
	symbol: string;
	color: string;
}

interface IMGDict {
	[key: string]: HTMLImageElement;
}
