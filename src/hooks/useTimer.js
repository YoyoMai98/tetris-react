import { useCallback, useEffect, useState } from 'react'

export const useTimer = () => {
    const [timeLeft, setTimeLeft] = useState(3)

    useEffect(() => {
        if(timeLeft <= 0){
        setTimeLeft(null)
        }

        if(!timeLeft) return

        const id = setInterval(() => {
                    setTimeLeft(timeLeft - 1)
                    }, 1000)

        return () => clearInterval(id)

    }, [timeLeft])

    const resetTimeLeft = useCallback(() => {
        setTimeLeft(3)
    }, [])

    return [timeLeft, resetTimeLeft]
}