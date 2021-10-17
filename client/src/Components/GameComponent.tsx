/** @format */

import classes from 'Styles/game.module.css';

import { useRef, useEffect, MutableRefObject } from 'react';
import {
	settings,
	colors,
	selectedPiece,
	availableMoves,
	aw,
	ab,
	setAvailableMoves,
	images,
	active,
	setSelectedPiece,
} from 'Game/settings';
import { pieceColor } from 'Game/utils';
import { squareDimentions } from 'Game/square';
import { init } from 'Game/init';
import { getCol, getRow } from 'Game/math';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

export default function GameComponent(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	let ctx: CanvasRenderingContext2D | null = null;
	let pieces: Piece[] = [];
	let gbc: any;
	let game: any;

	const main = () => {
		if (ctx !== null) {
			gbc = game.board.configuration;

			if (selectedPiece) {
				setAvailableMoves(game.moves(selectedPiece.symbol));
			}

			for (let i = 0; i < pieces.length; i++) {
				let d = squareDimentions(pieces[i]);
				ctx.fillStyle = colors[pieces[i].color === 'white' ? 0 : 1];

				if (availableMoves.includes(pieces[i].symbol)) {
					ctx.fillStyle = gbc.turn === 'white' ? aw : ab;
				}

				ctx.fillRect(d.x, d.y, d.w, d.h);

				let piece = gbc.pieces[pieces[i].symbol];
				if (piece) {
					let img = images[piece];

					if (selectedPiece && i + 1 === selectedPiece.square) {
						img = active[piece.toLowerCase()];
					}

					ctx.drawImage(img, d.x + settings.pw, d.y + settings.ph);
				}
			}
		}

		requestAnimationFrame(main);
	};

	const eventHandler = (e: any) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;

		let row = getRow(y);
		let col = getCol(x);

		for (let i = 0; i < pieces.length; i++) {
			if (pieces[i].col === col && pieces[i].row === row) {
				let p = gbc.pieces[pieces[i].symbol];

				let canMove =
					selectedPiece && availableMoves.includes(pieces[i].symbol);

				if (canMove) {
					game.move(selectedPiece.symbol, pieces[i].symbol);
					setSelectedPiece(null);
					setAvailableMoves([]);
				}

				if (pieceColor(p) === gbc.turn) {
					setSelectedPiece(pieces[i]);
				}
			}
		}
	};

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			ctx = canvasRef.current.getContext('2d');
			canvasRef.current.width = settings.w;
			canvasRef.current.height = settings.h;

			const newGame = init();
			game = newGame.game;
			pieces = newGame.pieces;
			gbc = game.board.configuration;
			return main();
		}
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
