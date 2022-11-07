import React, { ButtonHTMLAttributes } from 'react'
import './style.css'
import { DropdownProps } from './types'

const Dropdown: React.FC<DropdownProps> = ({handleSortBy, sortBy, direction, options, label}) => {

    return (
        <div className='select__wrapper'>
            <h3 className='select__label'>{label}</h3>
                <div className="select__button__wrapper">
                    {
                        options.map(option => 
                            <button
                                key={option.value}
                                className={
                                    label === 'Direction'
                                    ? (direction === option.value ? 'select__button btn' : 'select__button')
                                    : (sortBy === option.value ? 'select__button btn' : 'select__button')
                                }
                                type='button'
                                value={option.value}
                                onClick={(e) => handleSortBy(e.currentTarget.value)}
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