/** @format */

export const pieceColor = (letter: string): string => {
	if (
		letter === 'P' ||
		letter === 'N' ||
		letter === 'B' ||
		letter === 'Q' ||
		letter === 'K' ||
		letter === 'R'
	)
		return 'white';

	return 'black';
};
