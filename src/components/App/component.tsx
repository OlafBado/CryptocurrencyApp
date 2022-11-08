import React, { useCallback, useEffect, useReducer, useState } from 'react'
import './style.css'
import axios from 'axios'
import { CoinsReducerState, CoinsAction, NewsReducerState, NewsAction, CoinDetailsReducerState, CoinDetailsActions } from './types'
import { Route, Routes } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import getNewCoinsUrl from '../../services/CreateUrl/CoinsUrl'
import getCoinDetailsHistoryUrl from '../../services/CreateUrl/CoinDetailsHistoryUrl/service'
import getCoinDetailsUrl from '../../services/CreateUrl/CoinDetailsUrl/service'
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
import CoinDetails from '../CoinDetails'

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

const coinDetailsHistoryOptions = {
	headers: {
		'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

const coinDetailsOptions = {
    headers: {
        'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};

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
        case 'COINS_CHANGE_SORT_BY':
            return {
                ...state,
                sortBy: action.payload.sortBy
            }
        case 'COINS_CHANGE_DIRECTION':
            return {
                ...state,
                direction: action.payload.direction
            }
        case 'COINS_DEFAULT_STATE': 
            return {
                ...state,
                offset: 0,
                sortBy: 'marketCap',
                direction: 'desc'
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
                isLoading: false,
                isError: true
            }
        default:
            throw new Error()
    }
}

const coinDetailsReducer = (state: CoinDetailsReducerState, action: CoinDetailsActions) => {
    switch(action.type) {
        case 'COIN_DETAILS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'COIN_DETAILS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case 'COIN_DETAILS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data,
                chartData: {
                    ...state.chartData,
                    change: action.payload.change,
                    history: action.payload.priceHistory
                }
            }
        case 'COIN_DETAILS_CHANGE_TIME_PERIOD':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    timePeriod: action.payload
                }
            }
        case 'COIN_DETAILS_UPDATE_HISTORY':
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    change: action.payload.change,
                    history: action.payload.priceHistory
                }
            }
    }
}

const App = () => {

    const width = window.innerWidth
    const [inputResult, setInputResult] = useState<string>('')
    
    const [coinDetails, dispatchCoinDetails] = useReducer(coinDetailsReducer, {data:{},chartData:{change:'0', history:[], timePeriod: '3y'}, isLoading: false, isError: false})
    const [coinDetailsUrl, setCoinDetailsUrl] = useState<string>('')
    const [coinDetailsHistoryUrl, setCoinDetailsHistoryUrl] = useState<string>('')
    
    const [coins, dispatchCoins] = useReducer(coinsReducer, {data: [], sortBy: 'marketCap', direction: 'desc', offset:0, total:0, isLoading: false, isError: false})
    const [coinsUrl, setCoinsUrl] = useState<string[]>([getNewCoinsUrl('marketCap', 'desc', 10, coins.offset, '')])
    
    const [news, dispatchNews] = useReducer(newsReducer, {data: [], isLoading: false, isError: false})
    const [newsUrl, setNewsUrl] = useState<string>(getNewNewsUrl('Cryptocurrency', '20', '0'))
    
    const debouncedValue = useDebounce(coinsUrl[0], 300)
    console.log(news)
    // function for fetching coins, redefined by debounced input result value
    const handleFetchCoinDetails = useCallback(async () => {
        try {
            const coinDetails = await axios.get(coinDetailsUrl, coinDetailsOptions)
            const priceHistory = await axios.get(coinDetailsHistoryUrl, coinDetailsHistoryOptions)
            console.log(priceHistory)
            console.log(coinDetails)
            dispatchCoinDetails({
                type: 'COIN_DETAILS_FETCH_SUCCESS',
                payload: {
                    data: coinDetails.data.data.coin,
                    change: priceHistory.data.data.change,
                    priceHistory: priceHistory.data.data.history
                }
            })
        } catch {
            dispatchCoinDetails({
                type: 'COIN_DETAILS_FETCH_FAILURE'
            })
        }
    }, [coinDetailsUrl])

    const handleFetchCoinDetailsHistory = useCallback(async () => {
        try {
            const response = await axios.get(coinDetailsHistoryUrl, coinDetailsHistoryOptions)

            dispatchCoinDetails({
                type: 'COIN_DETAILS_UPDATE_HISTORY',
                payload: {
                    change: response.data.data.change,
                    priceHistory: response.data.data.history
                }
            })

        } catch {
            dispatchCoinDetails({
                type: 'COIN_DETAILS_FETCH_FAILURE'
            })
        }
    }, [coinDetailsHistoryUrl])

    useEffect(() => {
        handleFetchCoinDetailsHistory()
    }, [handleFetchCoinDetailsHistory])

    useEffect(() => {
        dispatchCoinDetails({
            type: 'COIN_DETAILS_FETCH_INIT'
        })
        handleFetchCoinDetails()
    }, [handleFetchCoinDetails])

    const handleFetchCoins = useCallback(async () => {

        try {
            const result = await axios.get(coinsUrl[0], coinsOptions)
            // console.log(result)
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
        const offset = parseInt(getSubstring(coinsUrl[0], 'offset=', '&'))
        setCoinsUrl([getNewCoinsUrl(coins.sortBy, coins.direction, 10, offset + 10, inputResult)])
        dispatchCoins({
            type: 'COINS_FETCH_MORE',
        })
    }

    const handleDefaultCoinsState = () => {
        dispatchCoins({
            type: 'COINS_DEFAULT_STATE'
        })
        setInputResult('')
        setCoinsUrl([getNewCoinsUrl('marketCap', 'desc', 
            10, 0, '')])
    }

    const handleGetCoinDetails = (id: string, name: string) => {
        setCoinDetailsUrl(getCoinDetailsUrl(id))
        setCoinDetailsHistoryUrl(getCoinDetailsHistoryUrl(id, coinDetails.chartData.timePeriod))
        setNewsUrl(getNewNewsUrl(name, '10', '0'))
    }

    const handleGetCoinHistory = (id: string, period: string) => {
        dispatchCoinDetails({
            type: 'COIN_DETAILS_CHANGE_TIME_PERIOD',
            payload: period
        })
        setCoinDetailsHistoryUrl(getCoinDetailsHistoryUrl(id, period))
    }

    const handleSortBy = (value: string) => {
        switch(value) {
            case 'desc':
            case 'asc':
                dispatchCoins({
                    type: 'COINS_CHANGE_DIRECTION',
                    payload: {
                        direction: value
                    }
                })
                dispatchCoins({
                    type: 'COINS_RESET_OFFSET',
                })
                setCoinsUrl([getNewCoinsUrl(coins.sortBy, 
                value, 10, coins.offset, inputResult)])
                break
            default:
                dispatchCoins({
                    type: 'COINS_CHANGE_SORT_BY',
                    payload: {
                        sortBy: value
                    }
                })
                dispatchCoins({
                    type: 'COINS_RESET_OFFSET',
                })
                setCoinsUrl([getNewCoinsUrl(value,
                coins.direction, 10, coins.offset, inputResult)])
                break
        }
    }
    

    return (
        <>
            <Navbar handleDefaultCoinsState={handleDefaultCoinsState}/>
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
                        coinUrl={coinsUrl}
                        sortBy={coins.sortBy}
                        direction={coins.direction}
                        handleSortBy={handleSortBy}
                    />
                }/>
                <Route path='/cryptocurrencies/:id' element={
                    coinDetails.isLoading 
                    ? <Spinner />
                    : <CoinDetails 
                        coinHistory={coinDetails.chartData} 
                        coinDetails={coinDetails.data} 
                        handleGetCoinDetails={handleGetCoinDetails}
                        handleGetCoinHistory={handleGetCoinHistory}
                        timePeriod={coinDetails.chartData.timePeriod}
                    />
                }

                />
            </Routes>
            <Footer />
        </>
    )
}

export default App