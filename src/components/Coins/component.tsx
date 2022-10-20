import React, { useEffect, useState } from 'react'
import './style.css'
import { CoinsProps, SingleCoinData } from './types'
import formatter from '../../services/Format/Price'

const Coins: React.FC<CoinsProps> = ({coins}) => {

    return (
        <main>
            <div className="container">
            {coins.length === 0 && <div>Error</div>}
            <h2 className='coins__title'>Top 10 coins by <br></br><span>market cap</span></h2>
                <div className='coins__wrapper'>
                {
                    coins?.map((coin: SingleCoinData) => {
                        const change = parseFloat(coin.change)
                        return (
                            <article key={coin.uuid} className='coin__wrapper'>
                                <div className='coin__upper-section row'>
                                    <h3 className='coin__name'>{coin.rank}.{coin.name}</h3>
                                    <img src={coin.iconUrl} alt="coin logo image" className='coin__logo'/>
                                </div>
                                <div className='coin__description'>
                                    <div className="row">
                                        <h4>Price</h4>
                                        <p>{formatter(coin.price)}</p>
                                    </div>
                                    <div className="row">
                                        <h4>Daily change</h4>
                                        <p 
                                            className={
                                                change === 0 
                                                ? 'coin__change'
                                                : change < 0
                                                ? 'coin__change coin__change__red'
                                                :  'coin__change coin__change__green'              
                                            }
                                        >
                                            {change}%
                                        </p>
                                    </div>
                                    <div className="row">
                                        <h4>Market cap</h4>
                                        <p>{formatter(coin.marketCap)}</p>
                                    </div>
                                </div>
                            </article>
                        )
                    })
                }
                </div>
            </div>
        </main>
    )
}

export default Coins