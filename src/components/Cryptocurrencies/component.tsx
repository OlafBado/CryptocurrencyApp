import React from 'react'
import './style.css'
import { CryptocurrenciesProps } from './types'
import SearchForm from '../SearchForm'
import Coin from '../Coin'
import Spinner from '../Spinner'

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({isLoading, coins, handleSearch, inputResult}) => {
    console.log(coins)
    return (
        <main>
        <div className="container">
            <h2 className='coins__title'>Find you <span>crypto</span>currency</h2>
            <SearchForm inputResult={inputResult} handleSearch={handleSearch}/>
            <div className='coins__wrapper'>
                {   
                    coins.length === 0 ?
                        <h3 style={{textAlign: 'center'}}>This coin does not exist...</h3>
                    :
                    isLoading ?
                        <Spinner/>
                    :
                        coins.map(coin => <Coin key={coin.uuid} coin={coin}/>)
                }
            </div>
            <button>Load more</button>
        </div>
        </main>
    )
}

export default Cryptocurrencies