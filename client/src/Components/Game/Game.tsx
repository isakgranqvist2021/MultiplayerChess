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
		piece.available = setAvailable({ ...piece, hasMoved: false }, pieces);
		return piece;
	});
}

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	const board: Board = new Board();
	const pieces: Piece[] = createPieces();

	let ctx: CanvasRenderingContext2D | null = null;

	const selectedSquare = () => {
		let prevSquare = board.squares.find(
			(square: Square) => square.selected
		);

		let prevPiece = pieces.find(
			(piece: Piece) => piece.position === prevSquare?.position
		);

		return {
			square: prevSquare,
			piece: prevPiece,
		};
	};

	let prev: {
		square: Square | undefined;
		piece: Piece | undefined;
	};

	let move: { from: Square | undefined; to: Square | undefined } = {
		from: undefined,
		to: undefined,
	};

	const selectSquare = (square: any) => {
		square.square.selected = true;

		let sameColor =
			square &&
			prev &&
			square.piece &&
			prev.piece &&
			square.piece.color === prev.piece.color;

		if (sameColor && prev.square) {
			prev.square.selected = false;
		} else if (!sameColor && prev && prev.square) {
			prev.square.selected = false;
			square.square.selected = false;
			return movePiece({
				from: prev.square,
				to: square.square,
			});
		}

		return (prev = selectedSquare());
	};

	const movePiece = (move: any) => {
		let piece = pieces.find(
			(piece: Piece) => piece.position === move.from.position
		);

		if (piece) {
			piece.move(move.to.position);
			piece.available = setAvailable(piece, pieces);
		}
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
				return selectSquare({
					square: square,
					piece: pieces.find(
						(piece: Piece) => piece.position === square.position
					),
				});
			}
		}
	};

	const main = () => {
		let sq = board.squares.find((sq: Square) => sq.selected);
		let p = pieces.find((p: Piece) => p.position === sq?.position);

		if (ctx !== null) {
			ctx.clearRect(0, 0, settings.w, settings.h);

			for (let i = 0; i < board.squares.length; i++) {
				board.squares[i].draw(ctx, p?.available || []);
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
