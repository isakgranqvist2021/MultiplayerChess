/** @format */

const addr = process.env.REACT_APP_SERVER_ADDR + '/public/sounds';

interface IDictionary<TValue> {
	[key: string]: TValue;
}

const sounds: IDictionary<HTMLAudioElement> = {
	game_over: new Audio(addr + '/game_over.wav'),
	game_start: new Audio(addr + '/game_start.wav'),
	player_join: new Audio(addr + '/player_join.wav'),
	player_leave: new Audio(addr + '/player_leave.wav'),
	player_move: new Audio(addr + '/player_move.wav'),
};

export const playSound = (key: string) => {
	let sound: any = sounds[key];
	sound.play();
};
