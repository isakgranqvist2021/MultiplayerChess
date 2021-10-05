/** @format */

export class Settings {
	public w: number;
	public h: number;
	public colors: any[] = ['white', 'black'];
	public debug: boolean = true;

	constructor() {
		this.w = 800;
		this.h = 800;
	}
}
