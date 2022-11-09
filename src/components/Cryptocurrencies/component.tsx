import React from 'react'
import './style.css'
import { CryptocurrenciesProps } from './types'
import SearchForm from '../SearchForm'
import Coin from '../Coin'
import Spinner from '../Spinner'

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({handleSortBy, sortBy, direction, coinUrl, total, handleFetchMore, isLoading, coins, handleSearch, inputResult}) => {
    return (
        <main>
        <div className="container">
            <h2 className='coins__title'>Find you <span>crypto</span>currency</h2>
            <SearchForm handleSortBy={handleSortBy} sortBy={sortBy} direction={direction} coinUrl={coinUrl} inputResult={inputResult} handleSearch={handleSearch}/>
            <div className='coins__wrapper'>
                {   
                    coins.length === 0 && !isLoading 
                    ? <h3 style={{textAlign: 'center'}}>This coin does not exist...</h3>
                    : coins.map(coin => <Coin key={coin.uuid} coin={coin}/>)
                }
            </div>
            <div className='coins__load-more__wrapper'>
                {
                    isLoading
                    ? <Spinner />
                    : <button 
                        disabled={total === coins.length ? true : false} 
                        className='btn coins__load-more' 
                        onClick={handleFetchMore}
                        style={{background: total === coins.length ? 'var(--color-hamburger)' : 'var(--color-purple)'}}
                        >
                            {total === coins.length ? 'No more coins' : 'Load more'}
                    </button>
                }
            </div>
        </div>
        </main>
    )
}

export default Cryptocurrencies