import React, { useEffect, useState } from 'react'
import './style.css'
import { DataState } from './types'
import axios from 'axios'
import formatter from '../../services/Format/Price/service'

const GlobalStats = () => {

    const [stats, setStats] = useState<DataState | undefined>()

    useEffect(() => {

        const options = {
        method: 'GET',
        url: 'https://coinranking1.p.rapidapi.com/stats',
        params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
        headers: {
            'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
        };
        
        axios.request(options).then(function (response) {
            setStats(response.data)
        }).catch(function (error) {
            console.error(error);
        });

    }, [])

    return (
        <section className='global-stats__section'>
            <div className="container">
                <h2 className='global-stats__title'>Global Crypto stats</h2>
                {
                    stats 
                    ?   
                    <>
                        <h3 className='best-coins__title'>Best performing coins</h3>
                        <div className='marquee'>
                            {
                                stats.data.bestCoins.map(coin => {
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
                            <div className='marquee'>
                            {
                                stats.data.newestCoins.map(coin => {
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
                    :   
                    <div>Loading...</div>
                }
            </div>
        </section>
    )
}

export default GlobalStats