/** @format */

import classes from 'Styles/game.module.css';

import { useRef, useEffect, MutableRefObject } from 'react';

import { settings, colors } from 'Game/settings';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine';
import { createBoard } from 'Game/board';

const game = new Game();

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

let img = new Image();

export default function GameComponent(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	let ctx: CanvasRenderingContext2D | null = null;
	let board: Piece[] = [];

	const main = () => {
		if (ctx !== null) {
			for (let i = 0; i < board.length; i++) {
				let x = ((board[i].col - 1) * settings.w) / settings.totalCols;
				let y = ((board[i].row - 1) * settings.h) / settings.totalRows;
				let w = settings.w / settings.totalRows;
				let h = settings.h / settings.totalCols;

				ctx.fillStyle = colors[board[i].color === 'white' ? 0 : 1];
				ctx.fillRect(x, y, w, h);

				let piece = game.board.configuration.pieces[board[i].symbol];
				if (piece) {
					img.src = `/pieces/${piece}.svg`;
					ctx.drawImage(img, x + settings.pw, y + settings.ph);
				}
			}
		}

		requestAnimationFrame(main);
	};

	useEffect(() => {
		if (canvasRef) {
			ctx = canvasRef.current.getContext('2d');
			canvasRef.current.width = settings.w;
			canvasRef.current.height = settings.h;
		}

		board = createBoard();
		return main();
	}, [canvasRef.current]);

	return (
		<div className={classes.game}>
			<canvas ref={canvasRef} className={classes.canvas}></canvas>
		</div>
	);
}
