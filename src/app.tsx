import './style.css'
import React from 'react';
import logo from './assets/webpack.svg'

export const a = (title: string) => {
    console.log(title)
}

export const b = (title: string) => {
    console.log(title)
}

interface AppProps {
    title: string
}

export const App: React.FC<AppProps> = ({title}) => {
    return (
        <div>
            {title}
            <img src={logo} alt="" />
        </div>
    )
}