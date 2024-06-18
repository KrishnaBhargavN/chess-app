"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new chess_js_1.Chess();
    this.startTime = new Date();
    const color = Math.random() > 0.5 ? "white" : "black";
    if (color === "black") {
      this.player1 = player2;
      this.player2 = player1;
    }
    this.player1.send(
      JSON.stringify({
        type: message_1.INIT_GAME,
        payload: { color: "white" },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: message_1.INIT_GAME,
        payload: { color: "black" },
      })
    );
  }
  makeMove(ws, move) {
    if (ws === this.player1 || ws === this.player2) {
      if (this.board.turn() === "w" && ws !== this.player1) {
        return;
      }
      if (this.board.turn() === "b" && ws !== this.player2) {
        return;
      }
      try {
        this.board.move(move);
      } catch (error) {
        console.log(error);
      }
      if (this.board.isDraw()) {
        this.player1.emit(
          JSON.stringify({
            type: message_1.GAME_OVER,
            payload: { winner: "draw" },
          })
        );
        this.player2.emit(
          JSON.stringify({
            type: message_1.GAME_OVER,
            payload: { winner: "draw" },
          })
        );
        return;
      }
      if (this.board.isCheckmate()) {
        console.log("checkmate" + this.board.turn() + "wins");
        this.player1.send(
          JSON.stringify({
            type: message_1.GAME_OVER,
            payload: { winner: this.board.turn() === "w" ? "black" : "white" },
          })
        );
        this.player2.send(
          JSON.stringify({
            type: message_1.GAME_OVER,
            payload: { winner: this.board.turn() === "w" ? "black" : "white" },
          })
        );
      }
      if (this.board.turn() === "w") {
        this.player1.send(
          JSON.stringify({ type: message_1.MOVE, payload: move })
        );
      } else {
        this.player2.send(
          JSON.stringify({ type: message_1.MOVE, payload: move })
        );
      }
      return;
    }
  }
}
exports.Game = Game;
