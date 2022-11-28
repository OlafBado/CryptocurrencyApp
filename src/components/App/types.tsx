interface Coin {
    coinrankingUrl: string;
    iconUrl: string;
    name: string;
    symbol: string;
    uuid: string;
}

interface PriceHistory {
    price: string;
    timestamp: number;
}

interface ChartData {
    change: string;
    history: PriceHistory[];
    timePeriod: string;
}

interface CoinSupply {
    circulating: string;
    confirmed: boolean;
    max: string;
    supplyAt: number;
    total: string;
}

interface SingleCoinDetailsDataLinks {
    name: string;
    url: string;
    type: string;
}

interface SingleCoinDetailsData extends SingleCoinData {
    links: SingleCoinDetailsDataLinks[];
    allTimeHigh: {
        price: string;
        timestamp: number;
    };
    supply: CoinSupply;
    description: string;
}

interface SingleCoinData extends Coin {
    "24hVolume": string;
    btcPrice: string;
    change: string;
    color: string;
    listedAt: number;
    marketCap: string;
    price: string;
    rank: number;
    tier: number;
}

interface CoinsReducerState {
    data: SingleCoinData[];
    isLoading: boolean;
    isError: boolean;
    offset: number;
    total: number;
    sortBy: string;
    direction: string;
}

interface SingleNewsData {
    author?: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    source?: SingleNewsDataSource;
}

interface SingleNewsDataSource {
    name: string;
    id: string;
}

export {
    CoinsReducerState,
    SingleCoinData,
    Coin,
    SingleNewsData,
    PriceHistory,
    SingleCoinDetailsData,
    ChartData,
};
