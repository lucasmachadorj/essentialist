type Empty = "";
type Board = (Player | Empty)[][];
type Player = "X" | "O";

type GameProps = {
  readonly board: Board;
  readonly turn: Player;
  readonly winner: Player | Empty;
  readonly over: boolean;
};

export class Game {
  private props: GameProps;

  constructor() {
    this.props = this.reset();
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

    if (this.isOver()) throw new Error("Game is over");
    if (!this.isCellEmpty(row, column)) return;

    this.setMove(row, column);
    this.verifyWinner(row, column);
    this.switchPlayer();
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

  isOver(): boolean {
    return this.props.over;
  }

  isDrawn(): boolean {
    return this.isOver() && !this.winner;
  }

  restart(): void {
    this.props = this.reset();
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
    const thereIsAWinner =
      this.isWholeColumnMarked(column) ||
      this.isWholeRowMarked(row) ||
      this.isDiagonalMarked();

    if (thereIsAWinner) {
      this.props = {
        ...this.props,
        winner: this.currentTurn(),
        over: true,
      };
    }
  }

  private isWholeRowMarked(row: number): boolean {
    return this.board[row].every((cell) => cell === this.currentTurn());
  }

  private isWholeColumnMarked(column: number): boolean {
    return this.board.every((row) => row[column] === this.currentTurn());
  }

  private isDiagonalMarked(): boolean {
    return this.isFirstDiagonalMarked() || this.isSecondDiagonalMarked();
  }

  private isFirstDiagonalMarked(): boolean {
    return this.board.every((row, index) => row[index] === this.currentTurn());
  }

  private isSecondDiagonalMarked(): boolean {
    return this.board.every(
      (row, index) => row[this.columnsSize - index - 1] === this.currentTurn()
    );
  }

  private isBoardFull(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ""));
  }

  private setMove(row: number, column: number): void {
    this.board[row][column] = this.currentTurn();
    if (this.isBoardFull()) {
      this.props = {
        ...this.props,
        over: true,
      };
    }
  }
  private switchPlayer(): void {
    this.props = {
      ...this.props,
      turn: this.oponent,
    };
  }
  private get oponent(): Player {
    return this.currentTurn() === "X" ? "O" : "X";
  }

  private reset = (): GameProps => {
    return {
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      turn: "X",
      winner: "",
      over: false,
    };
  };
}
