import React, { useCallback, useState } from 'react'
import "./Game.css"
import Menu from './Menu'
import { Teris } from './Teris'

import { useTimer } from "../hooks/useTimer"
import { useGameOver } from '../hooks/useGameOver'

const Game = ({rows, columns}) => {
  const [timeLeft, resetTimeLeft] = useTimer()
  const [initialLevel, setInitialLevel] = useState(1)

  const start = () =>{
    resetGameOver()
    resetTimeLeft()
  }

  const resetLevel = useCallback(() => {
    setInitialLevel(1)
  }, [])

  const [gameOver, setGameOver , resetGameOver] = useGameOver({resetLevel})

  const onLevel = () => {
    if(initialLevel < 10){
      setInitialLevel(prevLevel => prevLevel+1)
    }else {
      setInitialLevel(1)
    }
    resetTimeLeft()
  }

  return (
    <div className='game'>
        {gameOver? (
          <Menu onClick={start} onLevel={onLevel} initialLevel={initialLevel} />
        ) : (
          <>
            {timeLeft <= 0 ? (
              <Teris rows={rows} columns={columns}
                setGameOver={setGameOver}
                resetTimeLeft={resetTimeLeft}
                initialLevel={initialLevel}
              />
            ) : (
              <div className='timer'>{timeLeft}</div>
            )}
          </>
        )}
    </div>
  )
}

export default Game
