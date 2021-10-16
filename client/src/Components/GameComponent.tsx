/** @format */

import classes from 'Styles/game.module.css';

import { useRef, useEffect, MutableRefObject } from 'react';

import { settings, colors } from 'Game/settings';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine';
import { createBoard } from 'Game/board';
import { pieceColor } from 'Game/utils';

const game = new Game();

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

let selectedPiece: any = null;
let availableMoves: any[] = [];

export default function GameComponent(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	let ctx: CanvasRenderingContext2D | null = null;
	let pieces: Piece[] = [];

	const main = () => {
		if (ctx !== null) {
			if (selectedPiece) {
				availableMoves = game.moves(selectedPiece.symbol);
			}

			for (let i = 0; i < pieces.length; i++) {
				let x = ((pieces[i].col - 1) * settings.w) / settings.totalCols;
				let y = ((pieces[i].row - 1) * settings.h) / settings.totalRows;
				let w = settings.w / settings.totalRows;
				let h = settings.h / settings.totalCols;

				ctx.fillStyle = colors[pieces[i].color === 'white' ? 0 : 1];

				if (availableMoves.includes(pieces[i].symbol))
					ctx.fillStyle = '#b399e0';

				ctx.fillRect(x, y, w, h);

				let piece = game.board.configuration.pieces[pieces[i].symbol];

				if (piece) {
					let img = new Image();

					img.src = `/pieces/${piece}.svg`;

					if (selectedPiece && i + 1 === selectedPiece.square)
						img.src = `/pieces/green/${piece.toLowerCase()}.svg`;

					ctx.drawImage(img, x + settings.pw, y + settings.ph);
				}
			}
		}

		requestAnimationFrame(main);
	};

	const eventHandler = (e: any) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		let col = Math.floor(x / 100) + 1;
		let row = Math.floor(y / 100) + 1;

		for (let i = 0; i < pieces.length; i++) {
			if (pieces[i].col === col && pieces[i].row === row) {
				let p = game.board.configuration.pieces[pieces[i].symbol];

				if (
					selectedPiece &&
					availableMoves.includes(pieces[i].symbol)
				) {
					game.move(selectedPiece.symbol, pieces[i].symbol);
					selectedPiece = null;
					availableMoves = [];
				}

				if (pieceColor(p) === game.board.configuration.turn) {
					selectedPiece = pieces[i];
				}
			}
		}
	};

	useEffect(() => {
		if (canvasRef) {
			ctx = canvasRef.current.getContext('2d');
			canvasRef.current.width = settings.w;
			canvasRef.current.height = settings.h;
		}
		console.log(game);

		pieces = createBoard();
		return main();
	}, [canvasRef.current]);

	return (
		<div className={classes.game}>
			<canvas
				onClick={eventHandler}
				ref={canvasRef}
				className={classes.canvas}></canvas>
		</div>
	);
}
