import React from 'react'
import './style.css'
import { SearchFormProps } from './types'
import LastSearches from '../LastSearches'
import Dropdown from '../Dropdown'

const options1 = [
    {
        option: 'Market cap',
        value: 'marketCap'
    },
    {
        option: 'Price',
        value: 'price'
    },
    {
        option: '24h Volume',
        value: '24hVolume'
    },
    {
        option: 'Change',
        value: 'change'
    },
    {
        option: 'Listed at',
        value: 'listedAt'
    },
]

const options2 = [
    {
        option: 'Descending',
        value: 'desc'
    },
    {
        option: 'Ascending',
        value: 'asc'
    },
]

const SearchForm: React.FC<SearchFormProps> = ({coinUrl, handleSearch, inputResult}) => {
    return (
        <form onSubmit={e => e.preventDefault()} className='search-form'>
            <fieldset className='search-form__fieldset'>
                <input autoFocus placeholder='Search by name or symbol...' className='search-form__input' value={inputResult} type="text" onChange={e => handleSearch(e)} id='crypto-input'/>
                <div className='search-form__dropdowns-wrapper'>
                    <Dropdown label='Direction' options={options1}/>
                    <Dropdown label='Order by' options={options2}/>
                </div>
            </fieldset>
        </form>
    )
}

export default SearchForm