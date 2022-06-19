import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./Quit.css"

const Quit = ({onQuit}) => {
  const navigate = useNavigate()
  return (
    <div className='Quit-wrapper'>
        <div className="Quit">
            <div>Quit game?</div>
            <Link to="/">
                <button className='ok-btn'
                onClick={onQuit}
                >OK</button>
            </Link>
            <button className='cancel-btn'
                onClick={() => navigate(-1)}
            >Cancel</button>
        </div>
    </div>
  )
}

export default Quit