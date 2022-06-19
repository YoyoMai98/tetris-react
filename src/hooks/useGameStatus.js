import { useCallback, useState } from "react"

const buildGameStatus = ({initialLevel}) => ({
    level: initialLevel,
    linesCompleted: 0,
    linesPerLevel: 10,
    points: 0
})

const linePoints = [40, 100, 300, 1200]

export const useGameStatus = ({initialLevel}) => {
    const [gameStatus, setGameStatus] = useState(buildGameStatus({initialLevel}))

    const addLinesCleared = useCallback(lines => {
        setGameStatus(prev => {
            const points = prev.points + linePoints[lines - 1] * prev.level
            const {linesPerLevel} = gameStatus
            const newLinesCompleted = prev.linesCompleted + lines
            const level = newLinesCompleted >= linesPerLevel ? 
                        prev.level + 1 : prev.level
            const linesCompleted = newLinesCompleted % linesPerLevel

            return {
                level,
                linesCompleted,
                linesPerLevel,
                points
            }
        }, [])
    }, [gameStatus])
    
    return [gameStatus, addLinesCleared]
}