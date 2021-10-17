/** @format */

import { settings } from './settings';

export const getRow = (y: number) => {
	return (
		Math.floor(y / (settings.h / settings.totalRows)) + settings.indexOffset
	);
};

export const getCol = (x: number) => {
	return (
		Math.floor(x / (settings.w / settings.totalCols)) + settings.indexOffset
	);
};
