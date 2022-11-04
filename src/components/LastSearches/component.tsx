import React from 'react'
import './style.css'
import { LastSearchesProps } from './types'
import getSubstring from '../../services/FormatString/GetSubstring/service'

const LastSearches: React.FC<LastSearchesProps> = ({coinUrl}) => {

    return (
        <div className="search-form__memo">
            {
                coinUrl.map(url => {
                    const searchTerm = getSubstring(url, 'search=', '&')
                    return (
                        searchTerm !== '&' 
                        ? <button key={url}>{searchTerm}</button>
                        : null
                    )
                })
            }
        </div>
    )
}

export default LastSearches