import React, { ButtonHTMLAttributes } from 'react'
import './style.css'
import { DropdownProps } from './types'

const Dropdown: React.FC<DropdownProps> = ({options, label}) => {
    return (
        <div className='select__wrapper'>
            <h3 className='select__label'>{label}</h3>
                <div className="select__button__wrapper">
                    {
                        options.map(option => 
                            <button
                                key={option.value}
                                className='select__button'
                                type='button'
                                value={option.value}
                                onClick={e => console.log(e.target.value)}
                            >
                                {option.option}
                            </button>
                        )
                    }
                </div>
        </div>
    )
}

export default Dropdown