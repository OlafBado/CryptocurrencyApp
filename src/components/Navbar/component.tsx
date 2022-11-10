import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import logo from '../../assets/logo2.png'
import { NavLink } from 'react-router-dom'
import { NavbarProps } from './types'
import { WidthContext } from '../../services/Context/WidthContex'

const Navbar: React.FC<NavbarProps> = ({handleDefaultCoinsState}) => {

    const { width } = useContext(WidthContext)
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    
    useEffect(() => {
        width > 700 
        ? setIsNavOpen(true)
        : setIsNavOpen(false)
    }, [width])

    const handleNavbar = () => {
        handleDefaultCoinsState()
        width < 700 
        ? setIsNavOpen((prev) => !prev)
        : null
    }

    return (
        <header>
            <div className="container navbar__wrapper">
                <img src={logo} alt="navigation logo" className='logo'/>
                <nav className='navbar' style={{display: isNavOpen ? 'block' : 'none'}}>
                    <ul className='navbar__list'>
                        <li onClick={handleNavbar} className='navbar__list__item'><NavLink to="/" className={({isActive}) => (isActive ? 'navbar__list__item--active' : '')}>Home</NavLink></li>
                        <li onClick={handleNavbar} className='navbar__list__item'><NavLink to="/cryptocurrencies" className={({isActive}) => (isActive ? 'navbar__list__item--active' : '')}>Cryptocurrencies</NavLink></li>
                        <li className='navbar__list__item'><a href="#">News</a></li>
                    </ul>
                </nav>
                <button 
                    className='nav__toggle' 
                    onClick={() => setIsNavOpen((prev) => !prev)}
                >
                    <span 
                        className='hamburger'
                        style={{rotate: isNavOpen ? '45deg' : 'none', transform: isNavOpen ? 'none' : 'translateY(-3px)'}}
                    ></span>
                    <span 
                        className='hamburger'
                        style={{rotate: isNavOpen ? '-45deg' : 'none'}}
                    ></span>
                </button>
            </div>
        </header>
    )
}

export default Navbar