import "./Menu.css"

const Menu = ({onClick}) => {
  return (
    <div className='Menu' onClick={onClick}>
        <button className="btn">Play Teris</button>
    </div>
  )
}

export default Menu