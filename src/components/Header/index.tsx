import './styles.scss'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedRoute(location.pathname.substring(1))
  }, [])
  
  const handleRouting = (newRoute: string) => {
    if(newRoute === selectedRoute) return

    setSelectedRoute(newRoute)
    navigate(`/${newRoute}`)
  }

  return (
    <header className='header'>
      <span className='header__logo'>
        Simple Blockchain demo
      </span>
      <nav className='header__navigation'>
        <li
          className={`header__navigation-item ${selectedRoute==="block" ? "selected" : ""}`}
          onClick={() => handleRouting('block')}
        >
          Block
        </li>
        <li
          className={`header__navigation-item ${selectedRoute==="blockchain" ? "selected" : ""}`}
          onClick={() => handleRouting('blockchain')}
        >
          Blockchain
        </li>
      </nav>
    </header>
  )
}

export default Header