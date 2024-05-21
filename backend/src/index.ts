import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on("connection", (ws) => {
  console.log("connection");

  gameManager.addUser(ws);

  ws.on("disconnect", () => {
    gameManager.removeUser(ws);
  });
});
