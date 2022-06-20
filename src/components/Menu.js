import "./Menu.css"
import { Routes, Route, useNavigate } from "react-router-dom"
import Help from "./Help"

const Menu = ({onClick, onLevel, initialLevel}) => {
  const navigate = useNavigate()

  const navigateToHelp = () => {
    navigate('/help')
  }
  return (
    <div className="Menu-wrapper">
      <div className='Menu'>
          <button className="btn menu-btn" onClick={onClick}>Play Teris</button>
      </div>
      <div className="Menu Level">
        <button className="btn level-btn" onClick={onLevel}>
            Level: {initialLevel}
        </button>
      </div>
      <div className="Menu help">
        <button className="btn level-btn" onClick={navigateToHelp}>
          Help
        </button>
      </div>
      <Routes>
        <Route path="/help" element={<Help/>} />
      </Routes>
    </div>
  )
}

export default Menu