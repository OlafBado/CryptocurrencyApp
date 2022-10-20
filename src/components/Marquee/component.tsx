import React from 'react'
import './style.css'
import { MarqueeProps } from './types'

const Marquee: React.FC<MarqueeProps> = ({news}) => {
    return (
        <div className='marquee'>
            <ul className='marquee__content'>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
            </ul>
        </div>
    )
}

export default Marquee