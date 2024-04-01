import Cell from "./Cell.jsx";

const Row = ({ r, ri, flipCellsAroundMe }) => {
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
};

export default Row;
