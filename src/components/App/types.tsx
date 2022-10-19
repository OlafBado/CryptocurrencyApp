import { Coin } from '../GlobalStats/types'

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

interface CoinsData {
    coins:  SingleCoinData[]
}

interface CoinsState {
    status: string,
    data: CoinsData
}

export { CoinsState }