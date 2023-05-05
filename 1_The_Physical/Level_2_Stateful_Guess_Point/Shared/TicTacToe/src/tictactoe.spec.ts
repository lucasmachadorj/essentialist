import { Game } from "./tictactoe";

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

  it("should be player O the winner when O marks the whole second column", () => {
    game.playAt(0, 0);
    game.playAt(0, 1);
    game.playAt(1, 0);
    game.playAt(1, 1);
    game.playAt(2, 2);
    game.playAt(2, 1);
    expect(game.winner).toEqual("O");
    expect(game.isOver()).toEqual(true);
  });

  it("should be player X the winner when X marks the diagonal", () => {
    game.playAt(0, 0);
    game.playAt(0, 1);
    game.playAt(1, 1);
    game.playAt(2, 1);
    game.playAt(2, 2);
    expect(game.winner).toEqual("X");
    expect(game.isOver()).toEqual(true);
  });
});
