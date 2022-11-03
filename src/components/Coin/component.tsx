import React, { useEffect, useState } from 'react'
import './style.css'
import { CoinsProps, SingleCoinData } from './types'
import formatter from '../../services/Format/Price'

const Coins: React.FC<CoinsProps> = React.memo(({coin}) => {

    const change = parseFloat(coin.change)
    console.log('single coin')

    return (
        <>
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
        </>
    )
})

export default Coins