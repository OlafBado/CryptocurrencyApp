import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { CoinsState } from './types'
import fetchCoins from '../../services/FetchCoins/service'
import Navbar from '../Navbar'
import Hero from '../Hero'
import GlobalStats from '../GlobalStats'
import Top10Coins from '../Top10Coins'

// API Coinranking
// 1. Get general stats about crypto markets along with 3 best and newest coinst
// 2. Get list of coins and their general stats that can be paginated.
// 3. Get coin details - a lot of info about the coin
// 4. Get coin price history - create a chart from that
// 5. Get coin supply - another info for coin
// 6. Search endpoint - returns coins, markets and exchanges matching the query

// API Bing News Search
// 1. Get list of news from crypto world
// 2. Get list of news for specific crypto

const App = () => {

    const [coins, setCoins] = useState<CoinsState>()

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/coins',
            params: {
                referenceCurrencyUuid: 'yhjMzLPhuIDl',
                timePeriod: '24h',
                'tiers[0]': '1',
                orderBy: 'change',
                orderDirection: 'desc',
                limit: '10',
                offset: '0'
            },
            headers: {
                'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
            };
            
            axios.request(options).then(function (response) {
                // console.log(response.data);
                setCoins(response.data)
            }).catch(function (error) {
                console.error(error);
            });
    },[])

    return (
        <>
            <Navbar />
            <Hero />
            <GlobalStats />
            <Top10Coins />
        </>
    )
}

export default App



// fetchData()
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
//                 'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//             }
//         };
        
//         fetch('https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl', options)
//             .then(response => response.json())
//             .then(response => console.log(response))
//             .catch(err => console.error(err));