export const FETCH_STATE = {
    loading: "loading",
    fulfilled: "succeeded",
    failed: "failed",
};

export const SORT_BY_OPTIONS = [
    {
        option: "Market cap",
        value: "marketCap",
    },
    {
        option: "Price",
        value: "price",
    },
    {
        option: "24h Volume",
        value: "24hVolume",
    },
    {
        option: "Change",
        value: "change",
    },
    {
        option: "Listed at",
        value: "listedAt",
    },
];

export const DIRECTION_OPTIONS = [
    {
        option: "Descending",
        value: "desc",
    },
    {
        option: "Ascending",
        value: "asc",
    },
];

export const chartOptions = [
    {
        option: "5Y",
        value: "5y",
    },
    {
        option: "3Y",
        value: "3y",
    },
    {
        option: "1Y",
        value: "1y",
    },
    {
        option: "30D",
        value: "30d",
    },
    {
        option: "7D",
        value: "7d",
    },
    {
        option: "24H",
        value: "24h",
    },
    {
        option: "3H",
        value: "3h",
    },
    {
        option: "3M",
        value: "3m",
    },
];

export const DEFAULT_IMG =
    "https://cdn-icons-png.flaticon.com/512/1213/1213797.png";

export const mockedData = {
    cryptoNews: {
        cryptoNewsStatus: "succeeded",
        error: "",
        news: [
            {
                author: "string",
                content: "string",
                description: "string",
                publishedAt: "2022-11-22T11:00:00Z",
                title: "string",
                url: "string",
                urlToImage: "string",
                source: {
                    name: "string",
                    id: "string",
                },
            },
        ],
    },
    coinNews: {
        coinNewsStatus: "succeeded",
        error: "",
        news: [
            {
                author: "news author",
                content: "news content",
                description: "news description",
                publishedAt: "2022-11-22T11:00:00Z",
                title: "news title",
                url: "string",
                urlToImage: "string",
                source: {
                    name: "news source name",
                    id: "string",
                },
            },
        ],
    },
    globalStats: {
        globalStatsStatus: "succeeded",
        error: "",
        globalStats: {
            bestCoins: [
                {
                    coinrankingUrl: "string",
                    iconUrl: "string",
                    name: "string",
                    symbol: "string",
                    uuid: "string",
                },
            ],
            btcDominance: 1,
            newestCoins: [
                {
                    coinrankingUrl: "string",
                    iconUrl: "string",
                    name: "string",
                    symbol: "string",
                    uuid: "string",
                },
            ],
            referenceCurrencyRate: 1,
            total24hVolume: "9999",
            totalCoins: 1,
            totalExchanges: 1,
            totalMarketCap: "9999",
            totalMarkets: 1,
        },
    },
    top10coins: {
        top10coins: [
            {
                coinrankingUrl: "string",
                iconUrl: "string",
                name: "string",
                symbol: "string",
                uuid: "string",
                "24hVolume": "9999",
                btcPrice: "150",
                change: "99.9",
                color: "string",
                listedAt: 1,
                marketCap: "999",
                price: "150",
                rank: 1,
                tier: 1,
            },
        ],
        top10status: "succeeded",
        error: "",
    },
    cryptocurrencies: {
        coins: [
            {
                coinrankingUrl: "string",
                iconUrl: "string",
                name: "Bitcoin",
                symbol: "BTC",
                uuid: "btc",
                "24hVolume": "1234",
                btcPrice: "1600",
                change: "99.9",
                color: "string",
                listedAt: 1,
                marketCap: "9999",
                price: "150",
                rank: 1,
                tier: 1,
            },
            {
                coinrankingUrl: "string",
                iconUrl: "string",
                name: "Ethereum",
                symbol: "ETH",
                uuid: "eth",
                "24hVolume": "1234",
                btcPrice: "1600",
                change: "99.9",
                color: "string",
                listedAt: 1,
                marketCap: "222",
                price: "100",
                rank: 1,
                tier: 1,
            },
        ],
        input: "",
        sortBy: "marketCap",
        direction: "desc",
        coinsStatus: "succeeded",
        error: "",
        offset: 0,
        total: 0,
    },
    coinDetails: {
        coinDetailsStatus: "succeeded",
        error: "",
        coinDetails: {
            coinrankingUrl: "string",
            iconUrl: "string",
            name: "Bitcoin",
            symbol: "BTC",
            uuid: "string",
            "24hVolume": "1234",
            btcPrice: "1600",
            change: "99.9",
            color: "string",
            listedAt: 1438905600,
            marketCap: "9999",
            price: "150",
            rank: 1,
            tier: 1,
            links: [
                {
                    name: "string",
                    url: "string",
                    type: "string",
                },
            ],
            allTimeHigh: {
                price: "12345",
                timestamp: 1636502400,
            },
            supply: {
                circulating: "123",
                confirmed: true,
                max: "1234",
                supplyAt: 1669809122,
                total: "123",
            },
            description: "string",
        },
    },
    coinHistory: {
        coinHistoryStatus: "succeeded",
        error: "",
        timePeriod: "5y",
        coinHistory: [
            {
                price: "7.315750682178138",
                timestamp: 1669766400,
            },
            {
                price: "7.201274017671157",
                timestamp: 1669680000,
            },
        ],
    },
};
