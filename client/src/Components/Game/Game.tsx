/** @format */

import { useRef, useEffect, MutableRefObject } from 'react';
import { Board } from 'Utils/board';
import { Settings } from 'Utils/settings';
import { Piece, pieces } from 'Utils/piece';
import classes from 'Styles/game.module.css';
import { Square } from 'Utils/square';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

const player = {
	color: 'white',
};

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
		for (let i = 0; i < board.squares.length; i++) {
			board.squares[i].selected = false;
		}
	};

	const eventHandler = (e: any) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		let clickedSquare: any;

		let selectedSquare = board.squares.find(
			(square: Square) => square.selected
		);

		for (let i = 0; i < board.squares.length; i++) {
			let square = board.squares[i];

			let squareFound =
				x > square.x &&
				x < square.x + square.w &&
				y > square.y &&
				y < square.y + square.h;

			if (squareFound && !selectedSquare) {
				let pieceOnSquare = pieces.find(
					(piece: Piece) => piece.position === square.position
				);
				if (pieceOnSquare?.color === player.color) {
					square.selected = true;
				} else {
					return;
				}
			}

			if (squareFound) {
				clickedSquare = square;
			}
		}

		let piece = pieces.find(
			(piece: Piece) => piece.position === selectedSquare?.position
		);

		if (piece) {
			removeSelected();

			let index = pieces.findIndex(
				(piece: Piece) => piece.position === clickedSquare.position
			);

			if (index > 0 && pieces[index].color === player.color) {
				return;
			}

			if (index > 0) {
				pieces.splice(index, 1);
			}

			piece.position = clickedSquare.position;
		}
	};

	const main = () => {
		if (ctx !== null) {
			ctx.clearRect(0, 0, settings.w, settings.h);

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
