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
	setSettings,
} from 'Game/settings';
import { pieceColor } from 'Game/utils';
import { squareDimentions } from 'Game/square';
import { getCol, getRow } from 'Game/math';
import { game, pieces, gbc, playerRole } from 'Game/game';

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

		return requestAnimationFrame(main);
	};

	const eventHandler = (e: any) => {
		if (playerRole !== gbc.turn) return;

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
					syncRoom(
						'player move',
						selectedPiece.symbol,
						pieces[i].symbol
					);
					setSelectedPiece(null);
					return setAvailableMoves([]);
				}

				if (pieceColor(p) === gbc.turn) {
					return setSelectedPiece(pieces[i]);
				}
			}
		}
	};

	const syncRoom = (evType: string, from: string, to: string) => {
		props.socket.send(
			JSON.stringify({
				type: evType,
				payload: { from, to },
				uid: props.user?.sub,
				rid: props.roomId,
			})
		);
	};

	useEffect(() => {
		if (canvasRef && canvasRef.current) {
			ctx = canvasRef.current.getContext('2d');
			canvasRef.current.width = settings.w;
			canvasRef.current.height = settings.h;

			window.addEventListener('resize', () => {
				setSettings({
					...settings,
					w: window.innerWidth * 0.75,
					h: window.innerHeight * 0.75,
				});

				canvasRef.current.width = settings.w;
				canvasRef.current.height = settings.h;
			});

			main();
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
