import "./Menu.css"

const Menu = ({onClick, onLevel, initialLevel}) => {
  return (
    <>
      <div className='Menu'>
          <button className="btn" onClick={onClick}>Play Teris</button>
      </div>
      <div className="Level">
        <button className="btn level-btn" onClick={onLevel}>
          Level: {initialLevel}
        </button>
      </div>
    </>
  )
}

export default Menu