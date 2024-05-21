"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const message_1 = require("./message");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(ws) {
        this.users.push(ws);
        this.addHandler(ws);
    }
    removeUser(ws) {
        this.users = this.users.filter((user) => user !== ws);
    }
    addHandler(ws) {
        ws.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === message_1.INIT_GAME) {
                console.log(message.type);
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, ws);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = ws;
                }
            }
            if (message.type === message_1.MOVE) {
                const game = this.games.find((game) => game.player1 === ws || game.player2 === ws);
                if (game) {
                    game.makeMove(ws, message.move);
                }
            }
        });
    }
    handleMessage(ws, message) { }
}
exports.GameManager = GameManager;
