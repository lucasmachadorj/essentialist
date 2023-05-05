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
}

describe("Tic tac toe game", () => {
  it("should be defined", () => {
    expect(Game).toBeDefined();
  });

  it("should start with an empty board", () => {
    const game = new Game();
    expect(game.isBoardEmpty()).toEqual(true);
  });
});
