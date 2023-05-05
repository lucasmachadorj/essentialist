class Game {
  private board: string[][];
  private turn: string;
  private _winner: string;
  private over: boolean;

  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.turn = "X";
    this._winner = "";
    this.over = false;
  }

  isBoardEmpty(): boolean {
    return this.board.every((row) => row.every((cell) => cell === ""));
  }

  currentTurn(): string {
    return this.turn;
  }

  playAt(row: number, column: number): void {
    if (row >= this.rowsSize || column >= this.columnsSize)
      throw new Error("Cell out of range");

    if (!this.isCellEmpty(row, column)) return;

    if (this.currentTurn() === "X") {
      this.board[row][column] = "X";
      this.turn = "O";
      this.updateGameStatus("X", row, column);
      return;
    }
    this.board[row][column] = "O";
    this.turn = "X";
  }

  playerAt(row: number, column: number): string {
    return this.board[row][column];
  }

  get boardSize(): number {
    return this.rowsSize * this.columnsSize;
  }

  get winner(): string {
    return this._winner;
  }

  private get rowsSize(): number {
    return this.board.length;
  }

  private get columnsSize(): number {
    return this.board[0].length;
  }

  private isCellEmpty(row: number, column: number): boolean {
    return this.board[row][column] === "";
  }

  private updateGameStatus(
    currentPlayer: string,
    row: number,
    column: number
  ): void {
    if (this.isWholeRowMarkedBy(currentPlayer, row)) {
      this._winner = currentPlayer;
      this.over = true;
    }
  }

  isOver(): boolean {
    return this.over;
  }

  private isWholeRowMarkedBy(player: string, row: number): boolean {
    return this.board[row].every((cell) => cell === player);
  }
}

describe("Tic tac toe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it("should be defined", () => {
    expect(Game).toBeDefined();
  });

  it("should start with an empty board", () => {
    expect(game.isBoardEmpty()).toEqual(true);
  });

  it("should have a board with 9 cells", () => {
    expect(game.boardSize).toEqual(9);
  });

  it("should start with the player X", () => {
    expect(game.currentTurn()).toEqual("X");
  });

  it("should mark the first cell with X when first player chooses the first cell", () => {
    game.playAt(0, 0);
    expect(game.playerAt(0, 0)).toEqual("X");
  });

  it("should be O turn after X plays", () => {
    game.playAt(0, 0);
    expect(game.currentTurn()).toEqual("O");
  });

  it("should mark the second cell with O when second player chooses the second cell", () => {
    game.playAt(0, 0);
    game.playAt(0, 1);
    expect(game.playerAt(0, 1)).toEqual("O");
  });

  it("should be X turn after O plays", () => {
    game.playAt(0, 0);
    game.playAt(0, 1);
    expect(game.currentTurn()).toEqual("X");
  });

  it("should not allow a player to play in a cell already played", () => {
    game.playAt(0, 0);
    game.playAt(0, 0);
    expect(game.playerAt(0, 0)).toEqual("X");
  });

  it("should not allow a player to play in a cell out of range", () => {
    expect(() => game.playAt(0, 3)).toThrow();
  });

  it("should be player X the winner when X marks the whole first row", () => {
    game.playAt(0, 0);
    game.playAt(1, 0);
    game.playAt(0, 1);
    game.playAt(2, 0);
    game.playAt(0, 2);
    expect(game.winner).toEqual("X");
    expect(game.isOver()).toEqual(true);
  });
});
