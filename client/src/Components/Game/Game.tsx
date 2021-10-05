/** @format */

import { useRef, useEffect, MutableRefObject, useState } from 'react';
import { Board } from 'Utils/board';
import { Settings } from 'Utils/settings';
import { Piece, pieces } from 'Utils/piece';
import classes from 'Styles/game.module.css';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

function createPieces(
	settings: Settings
): { role: string; color: 'white' | 'black'; position: number }[] {
	let color = 'black';

	for (let i = 0; i < pieces.length; i++) {
		let p = i;

		if (i >= 16) {
			color = 'white';
			p = p + 32;
		}

		pieces[i].color = color;
		pieces[i].position = p;
	}

	return pieces;
}

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	const [board, setBoard] = useState<Board | null>(null);
	const [pieces, setPieces] = useState<Piece[]>([]);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [settings, setSettings] = useState<Settings>();

	const eventHandler = (e: any) => {
		const x = e.nativeEvent.offsetX,
			y = e.nativeEvent.offsetY;

		if (board) {
			for (let i = 0; i < board.squares.length; i++) {
				let square = board.squares[i];

				let clicked =
					x > square.x &&
					x < square.x + square.w &&
					y > square.y &&
					y < square.y + square.h;

				if (clicked) {
					console.log(square.position);
				}
			}
		}
	};

	const main = () => {
		if (ctx !== null && board !== null) {
			if (settings) {
				ctx.clearRect(0, 0, settings?.w, settings?.h);
			}

			for (let i = 0; i < board.squares.length; i++) {
				board.squares[i].draw(ctx);
			}

			for (let i = 0; i < pieces.length; i++) {
				pieces[i].draw(ctx);
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

			let pieces = createPieces(settings).map(
				(piece: any) => new Piece(piece)
			);
			console.log(board);
			setPieces(pieces);
		}
	}, [canvasRef.current, settings]);

	useEffect(() => {
		main();
	}, [board]);

	return (
		<canvas
			ref={canvasRef}
			className={classes.canvas}
			onClick={eventHandler}></canvas>
	);
}
