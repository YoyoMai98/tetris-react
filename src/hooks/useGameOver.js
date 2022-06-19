import { useCallback, useState } from "react"

export const useGameOver = ({resetLevel}) => {
    const [gameOver, setGameOver] = useState(true)

    const resetGameOver = useCallback(() => {
        setGameOver(false)
        resetLevel()
    }, [])

    return [gameOver, setGameOver, resetGameOver]
}