import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Help.css"

const Help = () => {
  const navigate = useNavigate()

  return (
    <div className="Help-wrapper">
      <div className='Help'>
        <div className='Help-div'>
          <div className="title">Control Keys</div>
          <div>Left arrow - Move Left</div>
          <div>Right arrow - Move right</div>
          <div>Up arrow - Rotate</div>
          <div>Down arrow - Soft drop</div>
          <div>Space - Hard drop</div>
          <div>P - Pause</div>
          <div>Q - Quit</div>
          <button className='done'
            onClick={() => navigate(-1)}
          >Done</button>
        </div>
      </div>
    </div>
  )
}

export default Help