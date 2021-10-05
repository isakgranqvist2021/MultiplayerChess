/** @format */

import { useRef, useEffect, MutableRefObject } from 'react';
import { createBoard } from 'Utils/board';
import { settings } from 'Utils/settings';
import { ISquare } from 'Utils/types';
import classes from 'Styles/game.module.css';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	const board: ISquare[] = [];
	let ctx: CanvasRenderingContext2D | null = null;

	const drawPieces = (): void => {};

	const init = (): void => {
		board.push(...createBoard());
		main();
	};

	const main = () => {
		if (ctx !== null) {
			for (let i = 0; i < board.length; i++) {
				let square: ISquare = board[i];
				ctx.strokeStyle = '#000';
				ctx.fillStyle = square.color;
				ctx.fillRect(square.x, square.y, square.w, square.h);
			}
		}

		requestAnimationFrame(main);
	};

	useEffect(() => {
		let canvas = canvasRef.current;
		canvas.width = settings.width;
		canvas.height = settings.height;
		ctx = canvas.getContext('2d');

		return () => init();
	}, [canvasRef]);

	return <canvas ref={canvasRef} className={classes.canvas}></canvas>;
}
