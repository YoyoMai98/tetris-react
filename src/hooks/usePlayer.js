import { useCallback, useState } from "react"
import {randomTetrominoes} from "../business/Tetrominoes"

const buildPlayer = prev => {
    let tetrominoes

    if(prev){
        tetrominoes = [...prev.tetrominoes]
        tetrominoes.unshift(randomTetrominoes())
    }else{
        tetrominoes = Array(5).fill(0)
            .map((_) => randomTetrominoes())
    }

    return {
        collided: false,
        isFastDropping: false,
        position: {row: 0, column: 4},
        tetrominoes,
        tetromino: tetrominoes.pop()
    }
}

export const usePlayer = () => {
    const [player, setPlayer] = useState(buildPlayer())

    const resetPlayer = useCallback(() => {
        setPlayer(prev => buildPlayer(prev))
    }, [])

    return [player, setPlayer, resetPlayer]
}