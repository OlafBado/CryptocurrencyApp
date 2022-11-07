import React, { useEffect } from 'react'
import './style.css'
import { CoinDetailsProps } from './types'
import { useParams } from 'react-router-dom'
import LineChart from '../LineChart'
import millify from 'millify'

const CoinDetails: React.FC<CoinDetailsProps> = ({coinDetails, coinHistory, handleGetCoinDetails}) => {
    
    const coinId = useParams()

    useEffect(() => {
        if (coinId.id) {
            handleGetCoinDetails(coinId.id)
        }
    }, [])

    return (
        <div>
            Crypto {coinId.id}
            <LineChart 
                coinHistory={coinHistory.history} 
                currentPrice={millify(coinDetails.price)} 
                coinName={coinDetails.name}
            />
        </div>
    )
}

export default CoinDetails