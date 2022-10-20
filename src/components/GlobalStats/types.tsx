interface Coin {
    coinrankingUrl: string,
    iconUrl: string,
    name: string,
    symbol: string,
    uuid: string
}

interface GlobalStats {
    bestCoins: Coin[],
    btcDominance: number,
    newestCoins : Coin[],
    referenceCurrencyRate: number,
    total24hVolume: string,
    totalCoins: number,
    totalExchanges: number,
    totalMarketCap: string,
    totalMarkets: number
}

type EmptyObject = Record<any, never>

interface GlobalStatsReducerState {
    data: GlobalStats | EmptyObject,
    isLoading: boolean,
    isError: boolean
}

interface ActionSuccess {
    type: 'STATS_FETCH_SUCCESS',
    payload: GlobalStats
}

interface ActionFailure {
    type: 'STATS_FETCH_FAILURE',
}

type Action = ActionSuccess | ActionFailure

export { GlobalStatsReducerState, Coin, Action }