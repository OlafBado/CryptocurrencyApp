import React, { useEffect, useReducer, useState } from 'react'
import './style.css'
import { GlobalStatsReducerState, Action, Coin } from './types'
import axios from 'axios'
import formatter from '../../services/Format/Price/service'
import Spinner from '../Spinner'
import { stat } from 'fs'

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/stats',
    params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
    headers: {
        'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};

const globalStatsReducer = (state: GlobalStatsReducerState, action: Action) => {

    switch(action.type) {
        case 'STATS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'STATS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            throw new Error()
    }

}



const GlobalStats = () => {
    
    const [stats, dispatchStats] = useReducer(globalStatsReducer, {data: {}, isLoading: true, isError: false})
    
    const handleFetchStats = async () => {

        try {
            const result = await axios.request(options)
            dispatchStats({
                type: 'STATS_FETCH_SUCCESS',
                payload: result.data.data
            })
        } catch {
            dispatchStats({
                type: 'STATS_FETCH_FAILURE',
            })
        }

    }

    useEffect( () => {

        handleFetchStats()

    }, [])

    return (
        <>
        {
            !stats.isLoading ?
        
            <section className='global-stats__section'>
                <div className="container">
                    <h2 className='global-stats__title'>Global Crypto stats</h2>
                    {
                        stats.isLoading
                        ?  <div>Loading...</div>
                        : stats.isError
                        ? <div>Error</div>
                        : <>
                            <h3 className='best-coins__title'>Best performing coins</h3>
                            <div className='global-stats-coins__wrapper'>
                                {
                                    stats.data.bestCoins.map((coin: Coin) => {
                                        return(
                                            <a 
                                                href={coin.coinrankingUrl}
                                                key={coin.uuid}
                                            >
                                                <img 
                                                    src={coin.iconUrl} 
                                                    alt={coin.name} 
                                                    className='best coin'
                                                />
                                            </a>
                                        )
                                    
                                    })
                                }
                            </div>
                            <article className='global-stats__article'>
                                    <div>
                                        <h3 className='global-stats__article__title'>Total Market Cap</h3>
                                        <p className='global-stats__article__text'>{formatter(stats.data.totalMarketCap)}</p>
                                        <h3 className='global-stats__article__title'>Total 24h Volume</h3>
                                        <p className='global-stats__article__text'>{formatter(stats.data.total24hVolume)}</p>
                                        <h3 className='global-stats__article__title'>BTC dominance</h3>
                                        <p className='global-stats__article__text'>{stats.data.btcDominance.toFixed(2)}%</p>
                                    </div>
                                    <div>
                                        <h3 className='global-stats__article__title'>Total Coins</h3>
                                        <p className='global-stats__article__text'>{stats.data.totalCoins}</p>
                                        <h3 className='global-stats__article__title'>Total Exchanges</h3>
                                        <p className='global-stats__article__text'>{stats.data.totalExchanges}</p>
                                        <h3 className='global-stats__article__title'>Total Markets</h3>
                                        <p className='global-stats__article__text'>{stats.data.totalMarkets}</p>
                                    </div>
                                </article>
                                <h3 className='newest-coins__title'>Newest coins</h3>
                                <div className='global-stats-coins__wrapper'>
                                {
                                    stats.data.newestCoins.map((coin: Coin) => {
                                        return(
                                            <a 
                                                href={coin.coinrankingUrl}
                                                key={coin.uuid}
                                            >
                                                <img 
                                                    src={coin.iconUrl} 
                                                    alt={coin.name} 
                                                    className='best coin'
                                                />
                                            </a>
                                        )
                                    
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </section>
        : <Spinner/>
        }
    </>
    )
}

export default GlobalStats