import { Color, PieceSymbol, Square, SQUARES } from "chess.js";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

export const Chessboard = ({
  board,
  socket,
  setBoard,
  chess,
  handleMove,
  setGameOver,
  setWinner,
  color,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any;
  chess: Chess;
  handleMove: (from: string, to: string) => void;
  setGameOver: any;
  setWinner: any;
  color: string;
}) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [invalidMove, setInvalidMove] = useState(false);

  const getSquareName = (row: number, col: number): string => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return `${files[col]}${8 - row}` as string;
  };

  useEffect(() => {
    console.log(from, to);
  }, [from, to]);

  const handleSquareClick = async (row: number, col: number) => {
    const squareName = getSquareName(row, col);
    console.log(squareName);

    if (from !== "") {
      setTo(squareName);
      console.log("to : ", to);
      try {
        await socket.send(
          JSON.stringify({
            type: "MOVE",
            move: { from, to: squareName },
          })
        );
        setInvalidMove(false);
      } catch (error) {
        console.log(error);
        setInvalidMove(true);
        setFrom("");
        setTo("");
        return;
      }
      const tempFrom = from;
      setFrom("");
      handleMove(tempFrom, squareName);
      setBoard(chess.board());
      if (chess.isGameOver()) {
        setWinner(chess.turn() === "w" ? "Black" : "White");
        setGameOver(true);
      }
      console.log("setboard called");
      console.log(board);
      setFrom("");
      setTo("");
      console.log(chess.fen());
    } else {
      if (
        chess.turn() === color[0].toLowerCase() &&
        chess.get(squareName as Square)
      ) {
        console.log(chess.get(squareName as Square));

        setFrom(squareName);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-8 grid-rows-8 gap-0 w-128 h-128 mt-10">
        {board.map((row, i) => {
          return row.map((square, j) => {
            return (
              <div
                key={`${i}-${j}`}
                className={`relative w-full h-full ${
                  (i + j) % 2 === 0 ? "bg-slate-200" : "bg-green-600"
                }`}
                onClick={() => handleSquareClick(i, j)}
              >
                {square && (
                  <img
                    src={`/src/assets/${square.color}${square.type}.svg`}
                    alt={`${square.color} ${square.type}`}
                    className="absolute inset-1/4 w-1/2 h-1/2"
                  />
                )}
              </div>
            );
          });
        })}
      </div>
      <div>
        {invalidMove && (
          <div className="text-red-500 text-center">Invalid move</div>
        )}
      </div>
    </div>
  );
};
