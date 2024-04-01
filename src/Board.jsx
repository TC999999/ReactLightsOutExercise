import "./Board.css";
import Row from "./Row.jsx";

const Board = ({ board, flipCellsAroundMe }) => {
  return (
    <div className="Board">
      <table>
        <tbody>
          {board.map((r, ri) => {
            return <Row r={r} ri={ri} flipCellsAroundMe={flipCellsAroundMe} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Board;
