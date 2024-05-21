import { Chessboard } from "../components/Chessboard";
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

export const INIT_GAME = "INIT_GAME";
export const MOVE = "MOVE";
export const GAME_OVER = "GAME_OVER";

function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState(chess.board());

  const handleMove = (from: string, to: string) => {
    chess.move({ from, to });
  };

  const updateBoard = (board: any) => {
    setBoard(board);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    console.log(socket);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          console.log("Game initialized");
          break;
        case MOVE:
          const move = message.payload;
          if (move) {
            chess.move(move);
            setBoard(chess.board());
            console.log("Move made");
            console.log("setboard called");
            console.log(chess.board());
          }
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className=" max-w-screen-lg w-full">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-8 ">
            <Chessboard
              chess={chess}
              setBoard={updateBoard}
              board={board}
              socket={socket}
              handleMove={handleMove}
            />
          </div>
          <div className="col-span-4 w-full self-center">
            <div className="flex justify-center ">
              <Button
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  );
                }}
              >
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Game;
