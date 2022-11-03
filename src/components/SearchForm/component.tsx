import React from 'react'
import './style.css'
import { SearchFormProps } from './types'
import LastSearches from '../LastSearches'

const SearchForm: React.FC<SearchFormProps> = ({handleSearch, inputResult}) => {
    return (
        <form className='search-form'>
            <fieldset className='search-form__fieldset'>
                <input autoFocus placeholder='Search by name or symbol...' className='search-form__input' value={inputResult} type="text" onChange={e => handleSearch(e)} id='crypto-input'/>
                <LastSearches/>
            </fieldset>
        </form>
    )
}

export default SearchForm