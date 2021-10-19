/** @format */

export const pieceColor = (letter: string): string => {
	if (letter === letter.toUpperCase()) return 'white';
	return 'black';
};
