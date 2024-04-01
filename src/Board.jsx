import Cell from "./Cell.jsx";
import { useState } from "react";
import Winner from "./Winner.jsx";
import Click from "./Click.jsx";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function OnOrOff(percent) {
  if (percent > 100 || percent < 0) {
    throw new Error("invalid percentage");
  }
  let chance = Math.floor(Math.random() * 100) + 1;
  return chance > percent ? false : true;
}

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 33 }) {
  const [board, setBoard] = useState(createBoard());
  const [clicks, setClicks] = useState(0);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let board = Array.from({ length: nrows });
    // TODO: create array-of-arrays of true/false values

    let row = Array.from({ length: ncols });
    let initialBoard = board.map((r) => {
      return row.map((c) => {
        let light = OnOrOff(chanceLightStartsOn);
        return light;
      });
    });

    return initialBoard;
  }

  function restart() {
    setBoard(createBoard());
    setClicks(0);
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let noFalse = 0;
    board.forEach((row) => {
      if (row.includes(false)) {
        noFalse = noFalse + 1;
      }
    });

    if (noFalse > 0) {
      return false;
    } else {
      return true;
    }
  }

  function flipCellsAroundMe(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const newBoard = oldBoard.map((arr) => {
        return [...arr];
      });

      // TODO: in the copy, flip this cell and the cells around it

      const flipAllCells = (y, x, boardCopy) => {
        let newBoardCopy = boardCopy.map((r, ri) => {
          return r.map((c, ci) => {
            if (
              (ci === x && (ri === y - 1 || ri === y + 1)) ||
              (ri === y && (ci === x - 1 || ci === x + 1)) ||
              (ci === x && ri === y)
            ) {
              return flipCell(ri, ci, boardCopy);
            }
          });
        });

        return newBoardCopy;
      };

      flipAllCells(y, x, newBoard);

      // TODO: return the copy

      return newBoard;
    });
    setClicks(clicks + 1);
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  return (
    <div className="Game">
      {!hasWon() && (
        <div className="Board">
          <table>
            <tbody>
              {board.map((r, ri) => {
                return (
                  <tr className="row">
                    {r.map((c, ci) => {
                      return (
                        <Cell
                          position={`${ri}-${ci}`}
                          flipCellsAroundMe={flipCellsAroundMe}
                          isLit={c}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {hasWon() && <Winner restart={restart} />}
      <Click clicks={clicks} />
    </div>
  );

  // TODO
}

export default Board;
