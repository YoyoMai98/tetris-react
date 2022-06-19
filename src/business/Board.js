import DefaultCell from "./DefaultCell"
import { movePlayer } from "./PlayerController"

export const buildBoard = ({rows, columns}) => {
    const builtRows = Array.from({length: rows}, () => 
        Array.from({length: columns}, () => ({...DefaultCell}))
    )

    return {
        rows: builtRows,
        size: {rows, columns}
    }
}

export const transferToBoard = ({
    className, isOccupied, rows, position, shape
}) => {
    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if(cell){
                const occupied = isOccupied
                const _y = y + position.row
                const _x = x + position.column
                rows[_y][_x] = {occupied, className}
            }
        })
    })
    return rows
}

const findDropPosition = ({board, position, shape}) => {
    let max = board.size.rows - position.row + 1
    let row = 0

    for(let i=0; i < max; i++){
        const delta = {row: i, column: 0}
        const result = movePlayer({delta, position, shape, board})
        const {collided} = result
        if(collided) break
        row = position.row + i
    }

    return {...position, row}
}

export const nextBoard = ({player, resetPlayer, board, addLinesCleared}) => {
    const {tetromino, position} = player
    // copy the previous board

    let rows = board.rows.map(row => (
        row.map(cell => (
            cell.occupied? cell : {...DefaultCell}
        ))
    ))

    const dropPosition = findDropPosition({
        board,
        position,
        shape: tetromino.shape
    })

    const className = `${tetromino.className} ${
        player.isFastDropping ? "" : "ghost"
    }`

    rows = transferToBoard({
        className,
        isOccupied: player.isFastDropping,
        rows,
        position: dropPosition,
        shape: tetromino.shape
    })

    // update the board
    if(!player.isFastDropping){
        rows = transferToBoard({
            className: tetromino.className,
            isOccupied: player.collided,
            rows,
            position,
            shape: tetromino.shape
        })
    }
    

    const blankRow = rows[0].map((_) => ({...DefaultCell}))
    let linesCleared = 0
    rows = rows.reduce((acc, row) => {
        if(row.every(column => column.occupied)){
            linesCleared++
            acc.unshift([...blankRow])
        }else{
            acc.push(row)
        }
        return acc
    }, [])

    if(linesCleared > 0){
        addLinesCleared(linesCleared)
    }

    if(player.collided || player.isFastDropping){
        resetPlayer()
    }

    return {
        rows,
        size: {...board.size}
    }
}

export const hasCollision = ({position, shape, board}) => {
  for(let y=0; y < shape.length; y++){
    const row = y + position.row
    for(let x=0; x < shape[y].length; x++){
        if(shape[y][x]){
            const column = x + position.column
            if(board.rows[row] && 
                board.rows[row][column] &&
                board.rows[row][column].occupied
            ){
                return true
            }
        }
    }
  }
  return false
}

export const isWithinBoard = ({position, shape, board}) => {
    for(let y=0; y < shape.length; y++){
        const row = y + position.row
        for(let x=0; x < shape[y].length; x++){
            if(shape[y][x]){
                const column = x + position.column
                const isValidPosition = board.rows[row] && board.rows[row][column]
                if(!isValidPosition) return false
            }
        }
    }
    return true
}