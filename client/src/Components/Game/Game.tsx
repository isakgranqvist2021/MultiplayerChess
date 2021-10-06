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

const captured = [];

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

		let clickedSquare: Square | undefined;
		let selectedSquare = board.squares.find(
			(square: Square) => square.selected
		);

		for (let i = 0; i < board.squares.length; i++) {
			let square: Square = board.squares[i];

			let squareFound =
				x > square.x &&
				x < square.x + square.w &&
				y > square.y &&
				y < square.y + square.h;

			if (squareFound && !selectedSquare) {
				let comparefn = (p: Piece) => p.position === square.position;
				let p = pieces.find(comparefn);
				if (!p) return;
				if (p.color === player.color) square.selected = true;
			}

			if (squareFound) {
				clickedSquare = square;
			}
		}

		let comparefn = (p: Piece) => p.position === selectedSquare?.position;
		let piece = pieces.find(comparefn);

		if (piece && clickedSquare) {
			removeSelected();

			let comparefn = (p: Piece) =>
				clickedSquare && p.position === clickedSquare.position;

			let index = pieces.findIndex(comparefn);
			if (index >= 0 && pieces[index].color === player.color) return;

			if (piece.capture(pieces, index)) {
				captured.push({
					piece: pieces[index],
					by: player.color,
				});
			}

			piece.move(clickedSquare.position);
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
