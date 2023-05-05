class Game {
  private board: string[][];

  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  isBoardEmpty(): boolean {
    return this.board.every((row) => row.every((cell) => cell === ""));
  }

  currentTurn(): string {
    return "X";
  }

  playAt(row: number, column: number): void {
    this.board[row][column] = "X";
  }

  playerAt(row: number, column: number): string {
    return this.board[row][column];
  }

  get boardSize(): number {
    return this.rowsSize * this.columnsSize;
  }

  private get rowsSize(): number {
    return this.board.length;
  }

  private get columnsSize(): number {
    return this.board[0].length;
  }
}

describe("Tic tac toe game", () => {
  it("should be defined", () => {
    expect(Game).toBeDefined();
  });

  it("should start with an empty board", () => {
    const game = new Game();
    expect(game.isBoardEmpty()).toEqual(true);
  });

  it("should have a board with 9 cells", () => {
    const game = new Game();
    expect(game.boardSize).toEqual(9);
  });

  it("should start with the player X", () => {
    const game = new Game();
    expect(game.currentTurn()).toEqual("X");
  });

  it("should mark the first cell with X when first player chooses the first cell", () => {
    const game = new Game();
    game.playAt(0, 0);
    expect(game.playerAt(0, 0)).toEqual("X");
  });
});
