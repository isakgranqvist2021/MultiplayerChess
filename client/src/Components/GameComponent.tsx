/** @format */

import settings from 'Game/settings';

import classes from 'Styles/game.module.css';

import { useRef, useEffect, MutableRefObject } from 'react';
import { Board } from 'Game/board';
import { Piece } from 'Game/piece';
import { Square } from 'Game/square';
import { setAvailable, pieces, player, resetPieces } from 'Game/global';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

export default function GameComponent(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	let board: Board = new Board();

	let ctx: CanvasRenderingContext2D | null = null;
	let lastClickedPiece: Piece | undefined;

	const start = () => {
		board = new Board();
		lastClickedPiece = undefined;

		resetPieces();
	};

	/*
		stage piece for movement if piece color is same as player color
		
		if a piece is staged for movement and new piece undefined then just move
		if a piece is staged for movement and new piece has opposite color to player then capture
		if a piece is staged for movement and new piece is same color then switch staged piece
	*/

	const selectPiece = (squarePosition: number): void => {
		let piece: Piece | undefined = findPieceWithSquare(squarePosition);

		let isOfPlayerColor: boolean =
			piece !== undefined && piece.color === player.color;

		let clickedSameTwice: boolean =
			piece !== undefined &&
			lastClickedPiece !== undefined &&
			piece.position === lastClickedPiece.position;

		if (clickedSameTwice && piece && lastClickedPiece) {
			piece.selected = false;
			lastClickedPiece.selected = false;
			lastClickedPiece = undefined;
			return;
		}

		if (lastClickedPiece) {
			lastClickedPiece.selected = false;
		}

		if (piece && lastClickedPiece && piece.color !== player.color) {
			lastClickedPiece.capture(piece);
			movePiece(squarePosition);
			return;
		}

		if (piece && isOfPlayerColor) {
			piece.selected = true;
			lastClickedPiece = piece;
			lastClickedPiece.available = setAvailable(lastClickedPiece);
		}

		if (!piece && lastClickedPiece) {
			movePiece(squarePosition);
			return;
		}
	};

	const movePiece = (squarePosition: number) => {
		if (lastClickedPiece) {
			lastClickedPiece.move(squarePosition);
			lastClickedPiece.available = setAvailable(lastClickedPiece);
			lastClickedPiece = undefined;
		}
	};

	const findPieceWithSquare = (position: number) => {
		return pieces
			.filter((p: Piece) => !p.captured)
			.find((p: Piece) => p.position === position);
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
		<div className={classes.game}>
			<button onClick={start}>Reset Board</button>
			<canvas
				ref={canvasRef}
				className={classes.canvas}
				onClick={eventHandler}></canvas>
		</div>
	);
}
