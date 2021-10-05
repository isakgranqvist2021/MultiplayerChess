/** @format */

import { useRef, useEffect, MutableRefObject } from 'react';
import classes from 'Styles/game.module.css';

const settings = {
	width: 600,
	height: 600,
};

interface ISquare {
	x: number;
	y: number;
	w: number;
	h: number;
	color: string;
}

const colors = ['white', 'black'];

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();

	const init = (ctx: CanvasRenderingContext2D): void => {
		let squares: number = 64;
		let perLine: number = 8;
		let board: ISquare[] = [];
		let x = 0;
		let y = 0;
		for (let i = 0; i < squares; i++) {
			let width = settings.width / perLine;
			let height = settings.height / perLine;
			let color = colors[0];

			let square = {
				x: x,
				y: y,
				w: width,
				h: height,
				color,
			};

			x += width;

			if (x >= settings.width) {
				x = 0;
				y += height;
			} else {
				colors.reverse();
			}

			board.push(square);
		}

		for (let i = 0; i < board.length; i++) {
			let square: ISquare = board[i];
			ctx.strokeStyle = '#000';
			ctx.fillStyle = square.color;
			ctx.fillRect(square.x, square.y, square.w, square.h);
		}
	};

	useEffect(() => {
		let canvas = canvasRef.current;
		canvas.width = settings.width;
		canvas.height = settings.height;

		let ctx = canvas.getContext('2d');
		init(ctx);

		return () => init(ctx);
	}, [canvasRef]);

	return <canvas ref={canvasRef} className={classes.canvas}></canvas>;
}
