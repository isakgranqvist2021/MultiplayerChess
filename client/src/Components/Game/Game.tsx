/** @format */

import settings from 'Utils/settings';

import { useRef, useEffect, MutableRefObject } from 'react';
import { Board } from 'Utils/board';
import { Piece } from 'Utils/piece';
import classes from 'Styles/game.module.css';
import { Square } from 'Utils/square';
import { setAvailable } from 'Utils/utils';

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

function createPieces(): Piece[] {
	let tp = settings.totalSquares / 2; // total pieces

	let pieces = new Array(tp).fill(0).map((p: any, i: number) => {
		let role = 'pawn';

		let isRook = i === 0 || i === 7 || i === 24 || i === 31;
		let isKnight = i === 1 || i === 6 || i === 25 || i === 30;
		let isBishop = i === 2 || i === 5 || i === 26 || i === 29;
		let isQueen = i === 3 || i === 27;
		let isKing = i === 4 || i === 28;

		if (isRook) role = 'rook';
		if (isKnight) role = 'knight';
		if (isBishop) role = 'bishop';
		if (isQueen) role = 'queen';
		if (isKing) role = 'king';

		let piece = new Piece({
			color: i >= tp / 2 ? 'white' : 'black',
			role: role,
			position: i >= tp / 2 ? i + tp : i,
		});

		return piece;
	});

	return pieces.map((piece: Piece) => {
		piece.available = setAvailable(
			{ ...piece, hasMoved: false },
			pieces,
			player.color
		);
		return piece;
	});
}

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	const board: Board = new Board();
	const pieces: Piece[] = createPieces();

	let ctx: CanvasRenderingContext2D | null = null;
	let lastClickedPiece: Piece | undefined;

	const selectPiece = (piece: Piece | undefined) => {
		if (piece === undefined) return;

		if (lastClickedPiece) {
			lastClickedPiece.selected = false;
		}

		piece.selected = true;
		lastClickedPiece = piece;
	};

	const movePiece = (move: any) => {};

	const findSquareWithPiece = (position: number) => {
		return board.squares.find((s: Square) => s.position === position);
	};

	const findPieceWithSquare = (position: number) => {
		return pieces.find((p: Piece) => p.position === position);
	};

	const eventHandler = (e: any) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		for (let i = 0; i < board.squares.length; i++) {
			let square: Square = board.squares[i];

			let match =
				x > square.x &&
				x < square.x + square.w &&
				y > square.y &&
				y < square.y + square.h;

			if (match) {
				return selectPiece(findPieceWithSquare(square.position));
			}
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
