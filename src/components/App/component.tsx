import React, { useEffect, useState } from 'react'

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

    const [list, setList] = useState([])
    const [page, setPage] = useState(0)

    const fetchData = () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        
        fetch(`https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=10&offset=${page}`, options)
            .then(response => {
                const res = response.json()
                return res
            })
            .then(response => {
                console.log(response)
                list.length === 0 ?setList(response.data.coins) : setList(list.concat(response.data.coins))
                
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData()
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
        };
        
        fetch('https://coinranking1.p.rapidapi.com/stats?referenceCurrencyUuid=yhjMzLPhuIDl', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }, [page])

    return (
        <div>
            <h1>hello react</h1>
            {list && 
            
                list.map(item => <div>{item.symbol}</div>)
            }
            <button onClick={() => setPage(prev => prev + 10)}>fetch</button>
        </div>
    )
}

export default App