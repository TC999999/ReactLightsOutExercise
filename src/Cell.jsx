import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit, position }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return (
    <td
      id={position}
      className={classes}
      onClick={() => flipCellsAroundMe(position)}
    />
  );
}

export default Cell;
