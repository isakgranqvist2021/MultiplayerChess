/** @format */

export const randId = (n: number = 10) => {
	let runes = 'qwertyuiopasdfghjklzxcvbnm1234567890_'.split('');
	let id: string = '';

	for (let i = 0; i < n; i++)
		id += runes[Math.floor(Math.random() * runes.length)];

	return id;
};
