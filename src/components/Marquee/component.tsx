import React, { JSXElementConstructor, ReactNode, useRef } from 'react'
import './style.css'
import { MarqueeProps } from './types'


const Marquee: React.FC<MarqueeProps> = ({children}) => {
    
    const marqueeRef = useRef(null)
    const marqueeItemRef = useRef(null)

    const addChild = () => {
        for (let i = 0; i < 20; i++) {
        }
    }

    return (
        <>
            <h2 className='marquee__title'>Latest news</h2>
            <div className='marquee'>
                <ul ref={marqueeRef} className='marquee__content'>
                    {children}
                </ul>
            </div>
        </>
    )
}

export default Marquee