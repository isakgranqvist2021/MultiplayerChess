/** @format */

import { init } from './init';

let newGame = init();
export let game: any = newGame.game;
export let pieces: Piece[] = newGame.pieces;
export let gbc = game.board.configuration;
export let playerRole: string | undefined;

export const setPlayerRole = (role: string) => (playerRole = role);

export const resetGame = (): void => {
	newGame = init();
	game = newGame.game;
	pieces = newGame.pieces;
	gbc = newGame.game.board.configuration;
};
