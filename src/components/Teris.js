import "./Teris.css"
import { useState } from "react"

import Board from "./Board"
import GameStatus from "./GameStatus"
import Previews from "./Previews"
import PauseButton from "./PauseButton"

import { usePlayer } from "../hooks/usePlayer"
import { useBoard } from "../hooks/useBoard"
import { useGameStatus } from "../hooks/useGameStatus"
import { useInterval } from "../hooks/useInterval"
import { useDropTime } from "../hooks/useDropTime"

import {Action, actionForKey, actionIsDrop} from "../business/Action"
import { playerController } from "../business/PlayerController"

export const Teris = ({rows, columns, setGameOver, resetTimeLeft}) => {
  const [gameStatus, addLinesCleared] = useGameStatus()
  const [player, setPlayer, resetPlayer] = usePlayer()
  const [board] = useBoard({
    player, resetPlayer, rows, columns, addLinesCleared
  })
  const [dropTime, resumeDropTime, pauseDropTime] = useDropTime({gameStatus})

  const [clicked, setClicked] = useState(false)

  useInterval(() => {
    handleInput({action: Action.SlowDrop})
  }, dropTime)

  const keyUp = ({code}) => {
    const action = actionForKey(code)
    if(actionIsDrop(action)) {
      resumeDropTime()
    }
  }

  const keyDown = ({code}) => {
    const action = actionForKey(code)
    if(!action) return
    if(action === Action.Pause){
      if(dropTime){
        pauseDropTime()
      }else{
        resumeDropTime()
      }
    }else if(action === Action.Quit){
      setGameOver(true)
      resetTimeLeft()
    }else {
      if(actionIsDrop(action)) pauseDropTime()
      if(!dropTime) return
      handleInput({action})
    }
  }

  const handleInput = ({action}) => {
    playerController({
      action, player, board, setPlayer, setGameOver, resetTimeLeft
    })
  }

  const onPause = () => {
    if(dropTime){
      setClicked(true)
      pauseDropTime()
    }
  }

  const onResume = () => {
    if(!dropTime){
      setClicked(false)
      resumeDropTime()
    }
  }

  const onQuit = () => {
    setGameOver(true)
    resetTimeLeft()
  }

  return (
    <div className="Teris-wrapper"
      role="button"
      tabIndex="0"
      onKeyUp={keyUp}
      onKeyDown={keyDown}
    >
        <div className='Teris'>
          <Board board={board} />
          <GameStatus gameStatus={gameStatus} />
          <Previews tetrominoes={player.tetrominoes} />
          <PauseButton onPause={onPause}
            clicked={clicked}
            onQuit={onQuit} 
            onResume={onResume}
          />
      </div>
    </div>
  )
}
