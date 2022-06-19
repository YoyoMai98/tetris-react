import { useCallback, useEffect, useState } from "react"

const defaultDropTime = 1000
const minDropTime = 100
const speedIncrement = 50

export const useDropTime = ({gameStatus}) => {
    const [dropTime, setDropTime] = useState(defaultDropTime)
    const [prevDropTime, setPrevDropTime] = useState()

    const resumeDropTime = useCallback(() => {
        if(!prevDropTime) return
        setDropTime(prevDropTime)
        setPrevDropTime(null)
    }, [prevDropTime])

    const pauseDropTime = useCallback(() => {
        if(dropTime){
            setPrevDropTime(dropTime)
        }
        setDropTime(null)
    }, [dropTime, setPrevDropTime])

    useEffect(() => {
        const speed = speedIncrement * (gameStatus.level - 1)
        const newDropTime = Math.max(minDropTime, defaultDropTime - speed)

        setDropTime(newDropTime)
    }, [gameStatus.level, setDropTime])

    return [dropTime, resumeDropTime, pauseDropTime]
}