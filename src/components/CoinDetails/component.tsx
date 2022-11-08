import React, { useEffect } from 'react'
import './style.css'
import { CoinDetailsProps } from './types'
import { useParams } from 'react-router-dom'
import LineChart from '../LineChart'
import millify from 'millify'
import HTMLparser from 'html-react-parser'
import ChangeButtons from '../ChangeButtons'

const options = [
    {
        option: '5Y',
        value: '5y'
    },
    {
        option: '3Y',
        value: '3y'
    },
    {
        option: '1Y',
        value: '1y'
    },
    {
        option: '30D',
        value: '30d'
    },
    {
        option: '7D',
        value: '7d'
    },
    {
        option: '24H',
        value: '24h'
    },
    {
        option: '3H',
        value: '3h'
    },
    {
        option: '3M',
        value: '3m'
    },

]

const CoinDetails: React.FC<CoinDetailsProps> = ({timePeriod, handleGetCoinHistory, coinDetails, coinHistory, handleGetCoinDetails}) => {
    
    const coinId = useParams()

    useEffect(() => {
        if (coinId.id) {
            handleGetCoinDetails(coinId.id, coinDetails.name)
        }
    }, [])

    const handleChangeHistoryPeriod = (period: string) => {
        if (coinId.id) {
            handleGetCoinHistory(coinId.id, period)
        }
    }

    return (
        <>
            <div className='container'>
                <h1>{coinDetails.name}({coinDetails.symbol})</h1>
                <p>{coinDetails.name} live price in US dollars. View historical price, staticstics and supply.</p>
                <ChangeButtons handler={handleChangeHistoryPeriod} options={options} state={timePeriod} label='Select time period'/>
            </div>
            <LineChart 
                coinHistory={coinHistory.history} 
                currentPrice={millify(coinDetails.price)} 
                coinName={coinDetails.name}
            />
            <div className="container">
                <h2>{coinDetails.name} value statistics</h2>
                <p>An overwiev showing the stats of {coinDetails.name}</p>
                <div className="coin-details__value-stats">
                    <div className="row">
                        <h4>Price to USD</h4>
                        <p>{millify(coinDetails.price)}</p>
                    </div>
                    <div className="row">
                        <h4>24h Volume</h4>
                        <p>{millify(parseInt(coinDetails['24hVolume']))}</p>
                    </div>
                    <div className="row">
                        <h4>Market Cap</h4>
                        <p>{millify(parseInt(coinDetails.marketCap))}</p>
                    </div>
                    <div className="row">
                        <h4>Tier</h4>
                        <p>{coinDetails.tier}</p>
                    </div>
                    <div className="row">
                        <h4>Listed At</h4>
                        <p>{new Date(coinDetails?.listedAt * 1000).toLocaleDateString()}</p>
                    </div>
                    <div className="row">
                        <h4>All-time-high (price)</h4>
                        <p>{millify(parseInt(coinDetails?.allTimeHigh?.price))}</p>
                    </div>
                    <div className="row">
                        <h4>All-time-high (date)</h4>
                        <p>{new Date(coinDetails?.allTimeHigh?.timestamp * 1000).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="coin-details__supply-stats">
                    <h2>{coinDetails.name} supply state</h2>
                    <p>An overwiev showing {coinDetails.name} supply state</p>
                    <div className="row">
                        <h4>Approved Supply</h4>
                        <p>{coinDetails?.supply?.confirmed ? ' YES' : 'NO'}</p>
                    </div>
                    <div className="row">
                        <h4>Total Supply</h4>
                        <p>{coinDetails?.supply?.total ? millify(parseInt(coinDetails?.supply?.total)): '--'}</p>
                    </div>
                    <div className="row">
                        <h4>Circulating Supply</h4>
                        <p>{coinDetails?.supply?.circulating ? millify(parseInt(coinDetails?.supply?.circulating)) : '--'}</p>
                    </div>
                    <div className="row">
                        <h4>Supply Limit</h4>
                        <p>{coinDetails?.supply?.max ? millify(parseInt(coinDetails?.supply?.max)) : '--'}</p>
                    </div>
                </div>
                <div className="coin-details__what-is">
                    <h2>What is {coinDetails.name}</h2>
                    {coinDetails?.description ? HTMLparser(coinDetails.description) : null}
                </div>
            </div>
        </>
    )
}

export default CoinDetails