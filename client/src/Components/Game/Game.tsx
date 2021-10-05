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
	square: number;
}

const colors = ['white', 'black'];

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();
	const board: ISquare[] = [];
	let ctx: CanvasRenderingContext2D | null = null;

	const drawBoard = () => {
		let squares: number = 64;
		let perRow: number = 8;

		let x = 0;
		let y = 0;
		for (let i = 0; i < squares; i++) {
			let width = settings.width / perRow;
			let height = settings.height / perRow;
			let color = colors[0];

			let square: ISquare = {
				x: x,
				y: y,
				w: width,
				h: height,
				color: color,
				square: i,
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
	};

	const init = (): void => {
		drawBoard();
		main();
	};

	const main = () => {
		if (ctx !== null) {
			for (let i = 0; i < board.length; i++) {
				let square: ISquare = board[i];
				ctx.strokeStyle = '#000';
				ctx.fillStyle = square.color;
				ctx.fillRect(square.x, square.y, square.w, square.h);
			}
		}

		requestAnimationFrame(main);
	};

	useEffect(() => {
		let canvas = canvasRef.current;
		canvas.width = settings.width;
		canvas.height = settings.height;

		ctx = canvas.getContext('2d');
		init();

		return () => init();
	}, [canvasRef]);

	return <canvas ref={canvasRef} className={classes.canvas}></canvas>;
}
