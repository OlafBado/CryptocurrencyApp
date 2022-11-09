import { SingleCoinDetailsData, ChartData, SingleNewsData } from '../App/types'
import { EmptyObject } from '../GlobalStats/types'

interface CoinDetailsProps {
    handleGetCoinDetails: (id: string, name: string) => void,
    coinDetails: SingleCoinDetailsData | EmptyObject,
    coinHistory: ChartData,
    handleGetCoinHistory: (id: string, period: string) => void,
    timePeriod: string,
    news: SingleNewsData[]
}

export { CoinDetailsProps }