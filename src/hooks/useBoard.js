import { useEffect, useState } from "react"
import { nextBoard, buildBoard } from "../business/Board"

export const useBoard = ({
    rows, columns, player, resetPlayer, addLinesCleared
}) => {
    const [board, setBoard] = useState(buildBoard({rows, columns}))

    useEffect(() => {
        setBoard(prevBoard => (
            nextBoard({
                board: prevBoard,
                player,
                resetPlayer,
                addLinesCleared
            })
        ))
    }, [player, resetPlayer, addLinesCleared])

    return [board]
}