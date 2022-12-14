import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import logo from "../../assets/logo3.png";
import { NavLink, Link } from "react-router-dom";
import { WidthContext } from "../../services/Context/WidthContex";
import useOutsideClick from "../../hooks/useOutsideClick";

const Navbar = () => {
    const { width } = useContext(WidthContext);
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const ref = useOutsideClick(setIsNavOpen);

    useEffect(() => {
        width > 700 ? setIsNavOpen(true) : setIsNavOpen(false);
    }, [width]);

    const handleNavbar = () => {
        width < 700 ? setIsNavOpen((prev) => !prev) : null;
    };

    const handleCloseNavbar = () => {
        width < 700 ? setIsNavOpen(false) : null;
    };

    return (
        <header ref={isNavOpen && width < 700 ? ref : null}>
            <div className="container navbar__wrapper">
                <Link to="/">
                    <img
                        onClick={handleCloseNavbar}
                        src={logo}
                        alt="navigation logo"
                        className="logo"
                    />
                </Link>
                <nav
                    className={
                        isNavOpen
                            ? "navbar navbar--open"
                            : "navbar navbar--closed"
                    }
                >
                    <ul className="navbar__list">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list__link--active"
                                    : "navbar__list__link"
                            }
                        >
                            <li
                                onClick={handleNavbar}
                                className="navbar__list__item"
                            >
                                Home
                            </li>
                        </NavLink>
                        <NavLink
                            to="/cryptocurrencies"
                            className={({ isActive }) =>
                                isActive
                                    ? "navbar__list__link--active"
                                    : "navbar__list__link"
                            }
                        >
                            <li
                                onClick={handleNavbar}
                                className="navbar__list__item"
                            >
                                Cryptocurrencies
                            </li>
                        </NavLink>
                    </ul>
                </nav>
                <button className="nav__toggle" onClick={handleNavbar}>
                    <span
                        className={
                            isNavOpen
                                ? "hamburger hamburger--upper"
                                : "hamburger hamburger--upper--closed"
                        }
                    ></span>
                    <span
                        className={
                            isNavOpen
                                ? "hamburger hamburger--lower"
                                : "hamburger"
                        }
                    ></span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
