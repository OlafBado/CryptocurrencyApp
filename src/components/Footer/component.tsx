import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <div className='footer__content__icons'>
                    <FontAwesomeIcon icon={faTwitter}/>
                    <a href="https://github.com/OlafBado" target='__blank'>
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                    <a href="https://www.linkedin.com/in/olaf-bado/" target='__blank'>
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </a>
                </div>
                <div className='footer__content__links'>
                    <span>Info</span>&nbsp;&#8226;&nbsp;
                    <span>Support</span>&nbsp; &#8226;&nbsp;
                    <span>Privacy Policy</span>
                </div>
                <p className='footer__content__copyrights'>© 2022 Olaf Bado</p>
            </div>
        </footer>
    )
}

export default Footer