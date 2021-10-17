/** @format */

import classes from 'Styles/game.module.css';

import { useState, useRef, useEffect, MutableRefObject } from 'react';
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
import { getCol, getRow } from 'Game/math';
import { init } from 'Game/init';

/*
        ♖♘♗♕♔♗♘♖
        ♙♙♙♙♙♙♙♙
            
              VS

        ♟♟♟♟♟♟♟♟
        ♜♞♝♛♚♝♞♜
*/

export default function GameComponent(props: {
	activeGame: boolean;
	socket: WebSocket;
	user: any;
	roomId: string;
}): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	let ctx: CanvasRenderingContext2D | null = null;
	let game: any;
	let gbc: any;
	let pieces: Piece[];

	const main = () => {
		if (ctx !== null) {
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

		if (props.activeGame) {
			requestAnimationFrame(main);
		}
	};

	const eventHandler = (e: any) => {
		if (!props.activeGame) return;

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
					syncRoom();
					return setAvailableMoves([]);
				}

				if (pieceColor(p) === gbc.turn) {
					syncRoom();
					return setSelectedPiece(pieces[i]);
				}
			}
		}
	};

	const syncRoom = () => {
		props.socket.send(
			JSON.stringify({
				type: 'sync room',
				payload: {
					user: props.user,
					game: game,
				},
				room: props.roomId,
			})
		);
	};

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			ctx = canvasRef.current.getContext('2d');
			canvasRef.current.width = settings.w;
			canvasRef.current.height = settings.h;
		}
	}, [canvasRef.current]);

	useEffect(() => {
		let g = init();
		game = g.game;
		pieces = g.pieces;
		gbc = game.board.configuration;
		return main();
	}, [props.activeGame]);

	return (
		<div className={classes.game}>
			<canvas
				onClick={eventHandler}
				ref={canvasRef}
				className={classes.canvas}></canvas>
		</div>
	);
}
