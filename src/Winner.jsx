const Winner = ({ restart }) => {
  return (
    <div id="winner-div">
      <p>YOU WIN!!!</p>
      <button onClick={restart}>Play Again!</button>
    </div>
  );
};

export default Winner;
