/** @format */

import { useRef, useEffect, MutableRefObject } from 'react';
import classes from 'Styles/game.module.css';

export default function Game(): JSX.Element {
	const canvasRef: any = useRef<MutableRefObject<HTMLCanvasElement | null>>();

	const init = (ctx: CanvasRenderingContext2D): void => {
		console.log(ctx);
	};

	useEffect(() => {
		return () => init(canvasRef.current.getContext('2d'));
	}, [canvasRef]);

	return <canvas ref={canvasRef} className={classes.canvas}></canvas>;
}
