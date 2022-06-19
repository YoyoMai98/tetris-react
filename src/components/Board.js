import "./Board.css"
import BoardCell from "./BoardCell"

const Board = ({board}) => {
  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
  }
  return (
    <div className="board-wrapper">
        <div className='board' style={boardStyles}>
          {board.rows.map(row => (
              row.map((cell, x) => (
                  <BoardCell key={x*board.size.rows + x} cell={cell} />
              ))
          ))}
      </div>
    </div>
  )
}

export default Board