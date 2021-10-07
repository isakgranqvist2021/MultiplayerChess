/** @format */

class Settings {
	public w: number = 800;
	public h: number = 800;
	public colors: any[] = ['white', 'black'];
	public debug: boolean = true;
	public totalSquares = 64;

	public perRow = 8;
	public perCol = this.totalSquares / this.perRow;

	public pieceWidth: number = 40;
	public pieceHeight: number = 40;

	public squareWidth: number = this.w / this.perRow;
	public squareHeight: number = this.h / this.perCol;
}

export default new Settings();
