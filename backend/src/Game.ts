import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, MOVE, INIT_GAME } from "./message";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    const color = Math.random() > 0.5 ? "white" : "black";
    if (color === "black") {
      this.player1 = player2;
      this.player2 = player1;
    }
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: { color: "white" },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: { color: "black" },
      })
    );
  }

  makeMove(ws: WebSocket, move: { from: string; to: string }) {
    if (ws === this.player1 || ws === this.player2) {
      if (this.board.turn() === "w" && ws !== this.player1) {
        return;
      }
      if (this.board.turn() === "b" && ws !== this.player2) {
        return;
      }
      try {
        this.board.move(move);
        console.log(this.board.board());
      } catch (error) {
        console.log(error);
      }

      if (this.board.isDraw()) {
        this.player1.emit(
          JSON.stringify({ type: GAME_OVER, payload: { winner: "draw" } })
        );
        this.player2.emit(
          JSON.stringify({ type: GAME_OVER, payload: { winner: "draw" } })
        );
        return;
      }
      if (this.board.isCheckmate()) {
        console.log("checkmate" + this.board.turn() + "wins");

        this.player1.send(
          JSON.stringify({
            type: GAME_OVER,
            payload: { winner: this.board.turn() === "w" ? "black" : "white" },
          })
        );
        this.player2.send(
          JSON.stringify({
            type: GAME_OVER,
            payload: { winner: this.board.turn() === "w" ? "black" : "white" },
          })
        );
        return;
      }

      if (this.board.turn() === "w") {
        this.player1.send(JSON.stringify({ type: MOVE, payload: move }));
      } else {
        this.player2.send(JSON.stringify({ type: MOVE, payload: move }));
      }

      return;
    }
  }
}
