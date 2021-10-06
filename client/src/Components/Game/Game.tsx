/** @format */

import { useRef, useEffect, MutableRefObject } from 'react';
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

function createPieces(): {
	role: string;
	color: 'white' | 'black';
	position: number;
}[] {
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

	const settings: Settings = new Settings();
	const board: Board = new Board(settings);
	const pieces: Piece[] = createPieces().map(
		(piece: any) => new Piece(piece)
	);

	let ctx: CanvasRenderingContext2D | null = null;

	const removeSelected = (): void => {
		if (board) {
			for (let i = 0; i < board.squares.length; i++) {
				board.squares[i].selected = false;
			}
		}
	};

	const eventHandler = (e: any) => {
		const x = e.nativeEvent.offsetX,
			y = e.nativeEvent.offsetY;

		if (board) {
			let clickedSquare: any;

			for (let i = 0; i < board.squares.length; i++) {
				let square = board.squares[i];

				let squareFound =
					x > square.x &&
					x < square.x + square.w &&
					y > square.y &&
					y < square.y + square.h;

				if (squareFound) {
					clickedSquare = square;
				}
			}

			if (clickedSquare) {
				removeSelected();

				let pieceOnSquare = pieces.some(
					(piece: Piece) => piece.position === clickedSquare.position
				);

				if (pieceOnSquare) {
					clickedSquare.selected = true;
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

		if (canvas && settings) {
			canvas.width = settings.w;
			canvas.height = settings.h;
			ctx = canvas.getContext('2d');
			main();
		}
	}, [canvasRef.current, settings]);

	return (
		<canvas
			ref={canvasRef}
			className={classes.canvas}
			onClick={eventHandler}></canvas>
	);
}
