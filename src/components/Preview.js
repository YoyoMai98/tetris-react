import React from "react"
import "./Preview.css"
import { buildBoard, transferToBoard } from '../business/Board'
import BoardCell from "./BoardCell"

const Preview = ({tetromino, index}) => {
  const {shape, className} = tetromino

  const board = buildBoard({rows: 4, columns: 4})

  const style = { top: `${index * 10 + 3}vw` }

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    rows: board.rows,
    position: {row: 0, column: 0},
    shape
  })

  return (
    <div className="Preview" style={style}>
        <div className="Preview-board">
            {board.rows.map(row => (
                row.map((cell, x) => (
                    <BoardCell key={x*board.size.rows + x} cell={cell} />
                ))
            ))}
        </div>
    </div>
  )
}

export default React.memo(Preview)