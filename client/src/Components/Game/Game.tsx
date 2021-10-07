/** @format */

import settings from 'Utils/settings';

import classes from 'Styles/game.module.css';

import { useRef, useEffect, MutableRefObject } from 'react';
import { Board } from 'Utils/board';
import { Piece } from 'Utils/piece';
import { Square } from 'Utils/square';
import { player, setAvailable, pieces } from 'Utils/global';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	const board: Board = new Board();

	let ctx: CanvasRenderingContext2D | null = null;
	let lastClickedPiece: Piece | undefined;

	/*
		stage piece for movement if piece color is same as player color
		
		if a piece is staged for movement and new piece undefined then just move
		if a piece is staged for movement and new piece has opposite color to player then capture
		if a piece is staged for movement and new piece is same color then switch piece that is staged for movement
	*/

	const selectPiece = (squarePosition: number) => {
		let piece: Piece | undefined = findPieceWithSquare(squarePosition);

		if (lastClickedPiece) {
			lastClickedPiece.selected = false;
		}

		if (piece) {
			piece.selected = true;
			lastClickedPiece = piece;
		}

		if (!piece && lastClickedPiece) {
			lastClickedPiece.move(squarePosition);
			lastClickedPiece.available = setAvailable(lastClickedPiece);
		}
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

			if (match) return selectPiece(square.position);
		}
	};

	const main = () => {
		if (ctx !== null) {
			ctx.clearRect(0, 0, settings.w, settings.h);

			for (let i = 0; i < board.squares.length; i++) {
				board.squares[i].draw(ctx, lastClickedPiece);
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
