import "./GameStatus.css"

const GameStatus = ({gameStatus}) => {
  const {level, linesCompleted, linesPerLevel, points} = gameStatus
  const linesToComplete = linesPerLevel - linesCompleted
  return (
    <ul className="gameStatus gameStatus_right">
        <li>Level</li>
        <li className="value">{level}</li>
        <li>Lines To Complete</li>
        <li className="value">{linesToComplete}</li>
        <li>Points</li>
        <li className="value">{points}</li>
    </ul>
  )
}

export default GameStatus