import { Coin, EmptyObject } from '../GlobalStats/types'

// type for coin details

interface PriceHistory {
    price: string,
    timestamp: number
}

interface ChartData {
    change: string,
    history: PriceHistory[],
    timePeriod: string
}

interface CoinSupply {
    circulating: string,
    confirmed: boolean,
    max: string,
    supplyAt: number,
    total: string
}

interface SingleCoinDetailsDataLinks {
    name: string,
    url: string,
    type: string
}

interface SingleCoinDetailsData extends SingleCoinData {
    links: SingleCoinDetailsDataLinks[],
    allTimeHigh: {
        price: string,
        timestamp: number
    },
    supply: CoinSupply,
    description: string
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

interface CoinDetailsActionUpdateHistory {
    type: 'COIN_DETAILS_UPDATE_HISTORY',
    payload: {
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
interface CoinDetailsActionChangeTimePeriod {
    type: 'COIN_DETAILS_CHANGE_TIME_PERIOD',
    payload: string
}

type CoinDetailsActions = CoinDetailsActionSuccess
    | CoinDetailsActionInit
    | CoinDetailsActionFailure
    | CoinDetailsActionChangeTimePeriod
    | CoinDetailsActionUpdateHistory

// type for single coin

interface SingleCoinData extends Coin {
        '24hVolume': string,
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
    author?: string,
    content: string,
    description: string,
    publishedAt: string,
    title: string,
    url: string,
    urlToImage: string,
    source?: SingleNewsDataSource;
}

interface SingleNewsDataSource {
    name: string,
    id: string
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