import React from 'react'
import "./PauseButton.css"
import Help from './Help'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Quit from './Quit'

const PauseButton = ({onPause, onResume, clicked, onQuit}) => {
  const navigate = useNavigate()

  const navigateToHelp = () => {
    navigate('/help')
  }

  const navigateToQuit = () => {
    navigate('/quit')
  }
  return (
    <>
        <div className='PauseButton'>
            <button className='pause_btn' onClick={onPause}>Pause</button>
        </div>
        {
            clicked ? (
                <>
                <div className='pause_board_wrapper'>
                    <div className="pause_board">
                        <p>Paused</p>
                        <button onClick={onResume}>Resume</button>
                        <button onClick={navigateToQuit}>Quit</button>
                        <button onClick={navigateToHelp}>Help</button>
                    </div>
                </div>
                <Routes>
                    <Route path="/help" element={<Help/>} />
                    <Route path="/quit" element={<Quit onQuit={onQuit}/>} />
                </Routes>
                </>
            ) : (
                <div></div>
            )
        }
    </>
  )
}

export default PauseButton