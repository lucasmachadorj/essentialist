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

  isOver(): boolean {
    return this.props.over;
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
    if (this.isWholeRowMarked(row)) {
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
