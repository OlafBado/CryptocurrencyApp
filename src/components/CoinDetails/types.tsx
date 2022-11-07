import { SingleCoinDetailsData, ChartData } from '../App/types'
import { EmptyObject } from '../GlobalStats/types'

interface CoinDetailsProps {
    handleGetCoinDetails: (id: string) => void,
    coinDetails: SingleCoinDetailsData | EmptyObject,
    coinHistory: ChartData
}

export { CoinDetailsProps }