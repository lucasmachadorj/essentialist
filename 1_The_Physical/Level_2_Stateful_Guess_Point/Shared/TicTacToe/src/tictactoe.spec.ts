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
    [
      [0, 0],
      [0, 1],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.playerAt(0, 1)).toEqual("O");
  });

  it("should be X turn after O plays", () => {
    [
      [0, 0],
      [0, 1],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.currentTurn()).toEqual("X");
  });

  it("should not allow a player to play in a cell already played", () => {
    [
      [0, 0],
      [0, 0],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.playerAt(0, 0)).toEqual("X");
  });

  it("should not allow a player to play in a cell out of range", () => {
    expect(() => game.playAt(0, 3)).toThrow();
  });

  it("should be player X the winner when X marks the whole first row", () => {
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.winner).toEqual("X");
    expect(game.isOver()).toEqual(true);
  });

  it("should be player O the winner when O marks the whole second column", () => {
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 2],
      [2, 1],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.winner).toEqual("O");
    expect(game.isOver()).toEqual(true);
  });

  it("should be player X the winner when X marks the diagonal", () => {
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.winner).toEqual("X");
    expect(game.isOver()).toEqual(true);
  });

  it("should draw when all cells are marked and there is no winner", () => {
    [
      [0, 1],
      [0, 0],
      [0, 2],
      [1, 1],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.winner).toEqual("");
    expect(game.isOver()).toEqual(true);
    expect(game.isDrawn()).toEqual(true);
  });

  it("should not allow to play after the game is over", () => {
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 2],
      [2, 1],
    ].forEach(([row, column]) => game.playAt(row, column));

    expect(() => game.playAt(2, 0)).toThrow();
  });

  it("should allow to restart the game after it is over", () => {
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 2],
      [2, 1],
    ].forEach(([row, column]) => game.playAt(row, column));
    expect(game.isOver()).toEqual(true);
    game.restart();
    expect(game.isBoardEmpty()).toEqual(true);
    expect(game.currentTurn()).toEqual("X");
    expect(game.isOver()).toEqual(false);
  });
});
