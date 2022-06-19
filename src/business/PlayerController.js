import { Action } from "./Action"
import { hasCollision, isWithinBoard } from "./Board"
import { rotate } from "./Tetrominoes"

export const attemptRotation = ({board, player, setPlayer}) => {
    const shape = rotate({
        matrix: player.tetromino.shape,
        direction: 1
    })

    const position = player.position
    const isValidRotation = isWithinBoard({position, shape, board}) &&
                            !hasCollision({position, shape, board})
    if(isValidRotation){
        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape
            }
        })
    }else{
        return false
    }
}

export const movePlayer = ({delta, position, shape, board}) => {
    const desiredNextPosition = {
        row: delta.row + position.row,
        column: delta.column + position.column
    }

    const collided = hasCollision({
        position: desiredNextPosition,
        shape,
        board
    })

    const isOnBoard = isWithinBoard({
        position: desiredNextPosition,
        shape,
        board
    })

    const preventMove = !isOnBoard || (isOnBoard && collided)
    const nextPosition = preventMove ? position : desiredNextPosition

    const isMovingDown = delta.row > 0
    const isHit = isMovingDown && (!isOnBoard || collided)

    return {
        collided: isHit,
        nextPosition
    }
}

export const attemptMovement = ({
    action, board, player, setPlayer, setGameOver, resetTimeLeft
}) => {
    const delta = {row: 0, column: 0}
    let isFastDropping = false

    if(action === Action.FastDrop){
        isFastDropping = true
    }else if(action === Action.SlowDrop){
        delta.row += 1
    }else if(action === Action.Left){
        delta.column -=1
    }else if(action === Action.Right){
        delta.column += 1
    }

    const {collided, nextPosition} = movePlayer({
        delta, 
        position: player.position,
        shape: player.tetromino.shape,
        board
    })

    const isGameOver = collided && player.position.row === 0

    if(isGameOver){
        setGameOver(isGameOver)
        resetTimeLeft()
    }

    setPlayer({
        ...player,
        collided,
        position: nextPosition,
        isFastDropping
    })
}

export const playerController = ({
    action, player, board, setPlayer, setGameOver, resetTimeLeft
}) => {
    if(!action) return
    if(action === Action.Rotate){
        attemptRotation({board, player, setPlayer})
    }else{
        attemptMovement({action, board, player, setPlayer, setGameOver, resetTimeLeft})
    }
}