import React, { useState } from 'react'
import './style.css'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

    return (
        <header>
            <div className="container">
                <img src={logo} alt="navigation logo" className='logo'/>
                <nav className='navbar' style={{display: isNavOpen ? 'block' : 'none'}}>
                    <ul className='navbar__list'>
                        <li className='navbar__list__item'><Link to="/">Home</Link></li>
                        <li className='navbar__list__item'><Link to="/cryptocurrencies">Cryptocurrencies</Link></li>
                        <li className='navbar__list__item'><a href="">News</a></li>
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