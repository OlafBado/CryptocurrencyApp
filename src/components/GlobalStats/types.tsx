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

interface DataState {
    status: string,
    data: GlobalStats
}

export { DataState, Coin }