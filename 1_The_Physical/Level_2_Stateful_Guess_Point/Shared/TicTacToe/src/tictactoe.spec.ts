type Empty = "";
type Board = (Player | Empty)[][];
type Player = "X" | "O";

type GameProps = {
  readonly board: Board;
  readonly turn: Player;
  readonly winner: Player | Empty;
  readonly over: boolean;
};

class Game {
  private props: GameProps;

  constructor() {
    this.props = {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      turn: "X",
      winner: "",
      over: false,
    };
  }

  isBoardEmpty(): boolean {
    return this.board.every((row) => row.every((cell) => cell === ""));
  }

  currentTurn(): Player {
    return this.props.turn;
  }

  playAt(row: number, column: number): void {
    if (row >= this.rowsSize || column >= this.columnsSize)
      throw new Error("Cell out of range");

    if (!this.isCellEmpty(row, column)) return;

    this.setMove(row, column);
    this.verifyWinner(row, column);
    this.swithPlayer();
  }

  playerAt(row: number, column: number): Player | Empty {
    return this.props.board[row][column];
  }

  get boardSize(): number {
    return this.rowsSize * this.columnsSize;
  }

  get winner(): Player | Empty {
    return this.props.winner;
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

  private get board(): Board {
    return this.props.board;
  }

  private verifyWinner(row: number, column: number): void {
    if (this.isWholeRowMarkedBy(this.currentTurn(), row)) {
      this.props = {
        ...this.props,
        winner: this.currentTurn(),
        over: true,
      };
    }
  }

  isOver(): boolean {
    return this.props.over;
  }

  private isWholeRowMarkedBy(player: Player, row: number): boolean {
    return this.board[row].every((cell) => cell === player);
  }

  private setMove(row: number, column: number): void {
    this.board[row][column] = this.currentTurn();
  }
  private swithPlayer(): void {
    this.props = {
      ...this.props,
      turn: this.oponent,
    };
  }
  private get oponent(): Player {
    return this.currentTurn() === "X" ? "O" : "X";
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
