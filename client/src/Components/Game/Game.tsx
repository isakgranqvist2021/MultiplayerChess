/** @format */

import { useRef, useEffect, MutableRefObject, useState } from 'react';
import { Board } from 'Utils/board';
import { Settings } from 'Utils/settings';
import { Piece } from 'Utils/pieces';
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
	const [board, setBoard] = useState<Board | null>(null);
	const [pieces, setPieces] = useState<Piece[]>([]);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [settings, setSettings] = useState<Settings>();

	const main = () => {
		if (ctx !== null && board !== null) {
			for (let i = 0; i < board.squares.length; i++) {
				board.squares[i].draw(ctx);
			}
		}

		requestAnimationFrame(main);
	};

	useEffect(() => {
		let canvas = canvasRef.current;

		if (!settings) {
			let settings = new Settings();
			setSettings(settings);
		}

		if (canvas && settings) {
			canvas.width = settings.w;
			canvas.height = settings.h;
			setCtx(canvas.getContext('2d'));
		}

		if (!board && settings) {
			let board = new Board(settings);
			setBoard(board);
		}
	}, [canvasRef.current, settings]);

	useEffect(() => {
		main();
	}, [board]);

	return <canvas ref={canvasRef} className={classes.canvas}></canvas>;
}
