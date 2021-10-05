/** @format */

import { useRef, useEffect, MutableRefObject } from 'react';
import classes from 'Styles/game.module.css';

const settings = {
	width: 600,
	height: 600,
};

const square = () => {};

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();

	const init = (ctx: CanvasRenderingContext2D): void => {
		for (let i = 0; i < settings.width / 64; i++) {
			// every 8th iteration increment by 1
			let y = 0;

			console.log(y);

			if (i % 2 === 1) {
				ctx.fillStyle = 'red';
			} else {
				ctx.fillStyle = 'yellow';
			}

			ctx.fillRect(
				(settings.width / 8) * i,
				y,
				settings.width / 8,
				settings.height / 8
			);

			console.log(i);
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
