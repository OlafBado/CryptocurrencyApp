import { Coin } from '../GlobalStats/types'

// type for single coin

interface SingleCoinData extends Coin {
        $24hVolume: string,
        btcPrice: string,
        change: string,
        color: string,
        listedAt: number,
        marketCap: string,
        price: string,
        rank: number,
        tier: number,
}

// types for coin reducer

interface CoinsReducerState {
    data: SingleCoinData[],
    isLoading: boolean,
    isError: boolean
}

// types for different action cases related to coin reducer

interface CoinsActionSuccess {
    type: 'COINS_FETCH_SUCCESS',
    payload: SingleCoinData[]
}

interface CoinsActionFailure {
    type: 'COINS_FETCH_FAILURE',
}

interface CoinsActionInit {
    type: 'COINS_FETCH_INIT'
}

type CoinsAction = CoinsActionSuccess | CoinsActionFailure | CoinsActionInit

// type for single news

interface SingleNewsData {
    datePublished: string,
    description: string,
    image?: {
        thumbnail: {
            contentUrl: string
        }
    } | null,
    name: string,
    url: string,
    provider: SingleNewsDataProvider[]
}

interface SingleNewsDataProvider {
    name: string,
    image: {
        thumbnail: {
            contentUrl: string
        }
    } | null
}

// type for news reducer

interface NewsReducerState {
    data: SingleNewsData[],
    isLoading: boolean,
    isError: boolean
}

// types for different action cases related to news reducer

interface NewsActionSuccess {
    type: 'NEWS_FETCH_SUCCESS',
    payload: SingleNewsData[]
}

interface NewsActionFailure {
    type: 'NEWS_FETCH_FAILURE',
}

interface NewsActionInit {
    type: 'NEWS_FETCH_INIT'
}

type NewsAction = NewsActionSuccess | NewsActionFailure | NewsActionInit

export { CoinsReducerState, 
    CoinsAction, SingleCoinData, 
    Coin, NewsReducerState, 
    SingleNewsData, NewsAction }