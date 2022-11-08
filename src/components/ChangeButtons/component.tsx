import React from 'react'
import './style.css'
import { ChangeButtonsProps } from './types'

const ChangeButtons: React.FC<ChangeButtonsProps> = ({handler, options, state, label}) => {
    return (
        <div className='select__wrapper'>
            <h3 className='select__label'>{label}</h3>
                <div className="select__button__wrapper">
                    {
                        options.map(option => 
                            <button
                                key={option.value}
                                className={
                                    state === option.value ? 'select__button btn' : 'select__button'
                                }
                                type='button'
                                value={option.value}
                                onClick={(e) => handler(e.currentTarget.value)}
                            >
                                {option.option}
                            </button>
                        )
                    }
                </div>
        </div>
    )
}

export default ChangeButtons