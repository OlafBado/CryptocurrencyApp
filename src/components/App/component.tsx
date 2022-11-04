import React, { useCallback, useEffect, useReducer, useState } from 'react'
import './style.css'
import axios from 'axios'
import { CoinsReducerState, CoinsAction, NewsReducerState, NewsAction } from './types'
import { Route, Routes } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import getNewCoinsUrl from '../../services/CreateUrl/CoinsUrl'
import getNewNewsUrl from '../../services/CreateUrl/NewsUrl/service'
import getSubstring from '../../services/FormatString/GetSubstring/service'
import Navbar from '../Navbar'
import Hero from '../Hero'
import GlobalStats from '../GlobalStats'
import Marquee from '../Marquee'
import NewsItem from '../NewsItem'
import Footer from '../Footer'
import NewsItemMarquee from '../NewsItemMarquee'
import Top10Coins from '../Top10Coins'
import Cryptocurrencies from '../Cryptocurrencies'
import Spinner from '../Spinner'

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

const coinsOptions = {
    headers: {
        'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
}

const newsOptions = {
    headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
};

// reducer function to handle coins data

const coinsReducer = (state: CoinsReducerState, action: CoinsAction) => {
    switch(action.type) {
        case 'COINS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'COINS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: 
                    state.offset === 0 
                    ? action.payload.data
                    : state.data.concat(action.payload.data),
                total: action.payload.total
            }
        case 'COINS_FETCH_FAILURE':
            return {
                ...state,
                isError: true
            }
        case 'COINS_FETCH_MORE':
            return {
                ...state,
                offset: state.offset + 10
            }
        case 'COINS_RESET_OFFSET':
            return {
                ...state,
                offset: 0
            }
        default:
            throw new Error()
    }
}

// reducer function to handle news data

const newsReducer = (state: NewsReducerState, action: NewsAction) => {
    switch(action.type) {
        case 'NEWS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'NEWS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'NEWS_FETCH_FAILURE':
            return {
                ...state,
                isError: true
            }
        default:
            throw new Error()
    }
}

const App = () => {

    const width = window.innerWidth
    const [inputResult, setInputResult] = useState<string>('')
    const [coins, dispatchCoins] = useReducer(coinsReducer, {data: [], offset:0, total:0, isLoading: false, isError: false})
    const [coinUrl, setCoinsUrl] = useState<string[]>([getNewCoinsUrl('marketCap', 'desc', 10, 0, '')])
    const [news, dispatchNews] = useReducer(newsReducer, {data: [], isLoading: false, isError: false})
    const [newsUrl, setNewsUrl] = useState<string>(getNewNewsUrl('Cryptocurrency', '20', '0'))
    const debouncedValue = useDebounce(coinUrl[0], 300)
    // function for fetching coins, redefined by debounced input result value

    const handleFetchCoins = useCallback(async () => {

        try {
            const result = await axios.get(coinUrl[0], coinsOptions)
            dispatchCoins({
                type: 'COINS_FETCH_SUCCESS',
                payload: {
                    data:result.data.data.coins,
                    total: result.data.data.stats.total
                }
            })
        } catch {
            dispatchCoins({
                type: 'COINS_FETCH_FAILURE'
            })
        }

    }, [debouncedValue])

    // function for fetching news, redefines when url for coins changes

    const handleFetchNews = useCallback(async () => {

        try {
            const result = await axios.get(newsUrl, newsOptions)
            dispatchNews({
                type: 'NEWS_FETCH_SUCCESS',
                payload: result.data.value
            })
        } catch {
            dispatchNews({
                type: 'NEWS_FETCH_FAILURE'
            })
        }

    }, [newsUrl])
    
    // useEffect for fetching coins, fires when coins function redefines

    useEffect(() => {
        dispatchCoins({
            type: 'COINS_FETCH_INIT'
        })
        handleFetchCoins()
    }, [handleFetchCoins])

    // useEffect for fetching news, fires when news function redefines

    useEffect(() => {
        dispatchNews({
            type: 'NEWS_FETCH_INIT'
        })
        handleFetchNews()
    }, [handleFetchNews])

    const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputResult(e.target.value)
        dispatchCoins({
            type: 'COINS_RESET_OFFSET'
        })
        setCoinsUrl([getNewCoinsUrl('marketCap', 'desc', 10, 0, e.target.value)])
    }, [inputResult])
    
    const handleFetchMore = () => {
        const offset = parseInt(getSubstring(coinUrl[0], 'offset=', '&'))
        setCoinsUrl([getNewCoinsUrl('marketCap', 'desc', 10, offset + 10, inputResult)])
        dispatchCoins({
            type: 'COINS_FETCH_MORE',
        })
    }

    const handleOrderBy = (value: string) => {
        
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={
                    <>
                        <Hero />
                        <GlobalStats />
                        {
                            coins.isLoading ?
                            <Spinner/>
                            :
                            <Top10Coins
                                coins={coins.data.slice(0,10)}
                            />
                        }
                        {/* <Marquee>
                            {news.data.map(item => 
                                width > 600 
                                ? <NewsItem 
                                key={item.url}
                                    news={item} 
                                />
                                : <NewsItemMarquee
                                    key={item.url}
                                    time={item.datePublished} 
                                    title={item.name} 
                                    img={item.image} 
                                    url={item.url}
                                />
                            )}
                        </Marquee> */}
                    </>
                }
                />
                <Route path='/cryptocurrencies' element={
                    <Cryptocurrencies 
                        coins={coins.data}
                        handleSearch={handleSearch}
                        inputResult={inputResult}
                        isLoading={coins.isLoading}
                        handleFetchMore={handleFetchMore}
                        total={coins.total}
                        coinUrl={coinUrl}
                    />
                }/>
            </Routes>
            <Footer />
        </>
    )
}

export default App