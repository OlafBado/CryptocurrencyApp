import { Coin, EmptyObject } from '../GlobalStats/types'

// type for coin details

interface PriceHistory {
    price: string,
    timestamp: number
}

interface ChartData {
    change: string,
    history: PriceHistory[]
}

interface SingleCoinDetailsDataLinks {
    name: string,
    url: string
}

interface SingleCoinDetailsData extends SingleCoinData {
    links: SingleCoinDetailsDataLinks[]
}

interface CoinDetailsReducerState {
    data: SingleCoinDetailsData | EmptyObject,
    chartData: ChartData,
    isLoading: boolean,
    isError: boolean
}

// types for coinDetailsReducer actions

interface CoinDetailsActionSuccess {
    type: 'COIN_DETAILS_FETCH_SUCCESS',
    payload: {
        data: SingleCoinDetailsData,
        change: string,
        priceHistory: PriceHistory[]
    }
    
}

interface CoinDetailsActionInit {
    type: 'COIN_DETAILS_FETCH_INIT'
}

interface CoinDetailsActionFailure {
    type: 'COIN_DETAILS_FETCH_FAILURE'
}

type CoinDetailsActions = CoinDetailsActionSuccess
    | CoinDetailsActionInit
    | CoinDetailsActionFailure

// type for single coin

interface SingleCoinData extends Coin {
        $24hVolume: string,
        btcPrice: string,
        change: string,
        color: string,
        listedAt: number,
        marketCap: string,
        price: number, //changed
        rank: number,
        tier: number,
}

// types for coin reducer

interface CoinsReducerState {
    data: SingleCoinData[],
    isLoading: boolean,
    isError: boolean,
    offset: number,
    total: number,
    sortBy: string,
    direction: string
}

// types for different action cases related to coin reducer

interface CoinsActionSuccess {
    type: 'COINS_FETCH_SUCCESS',
    payload: {
        data: SingleCoinData[],
        total: number
    }
}

interface CoinsActionFailure {
    type: 'COINS_FETCH_FAILURE',
}

interface CoinsActionInit {
    type: 'COINS_FETCH_INIT'
}

interface CoinsActionFetchMore {
    type: 'COINS_FETCH_MORE'
}

interface CoinsActionResetOffset {
    type: 'COINS_RESET_OFFSET'
}

interface CoinsActionDefaultState {
    type: 'COINS_DEFAULT_STATE'
}

interface CoinsActionChangeSortBy {
    type: 'COINS_CHANGE_SORT_BY',
    payload: {
        sortBy: string
    }
}

interface CoinsActionChangeDirection {
    type: 'COINS_CHANGE_DIRECTION',
    payload: {
        direction: string
    }
}

type CoinsAction = CoinsActionSuccess 
    | CoinsActionFailure 
    | CoinsActionInit 
    | CoinsActionFetchMore 
    | CoinsActionResetOffset
    | CoinsActionChangeDirection
    | CoinsActionChangeSortBy
    | CoinsActionDefaultState

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
    SingleNewsData, NewsAction,
    CoinDetailsReducerState,
    CoinDetailsActions,
    PriceHistory, SingleCoinDetailsData,
    ChartData }