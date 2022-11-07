import { PriceHistory } from '../App/types'

interface LineChartProps {
    coinHistory: PriceHistory[],
    currentPrice: string,
    coinName: string
}

export default LineChartProps