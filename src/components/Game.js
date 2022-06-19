import React from 'react'
import "./Game.css"
import Menu from './Menu'
import { Teris } from './Teris'

import { useTimer } from "../hooks/useTimer"
import { useGameOver } from '../hooks/useGameOver'

const Game = ({rows, columns}) => {
  const [gameOver, setGameOver , resetGameOver] = useGameOver()
  const [timeLeft, resetTimeLeft] = useTimer()

  const start = () => resetGameOver()

  return (
    <div>
        {gameOver? (
          <Menu onClick={start} />
        ) : (
          <>
            {timeLeft <= 0 ? (
              <Teris rows={rows} columns={columns}
                setGameOver={setGameOver}
                resetTimeLeft={resetTimeLeft}
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
