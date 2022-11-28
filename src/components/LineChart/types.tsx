import { PriceHistory } from "../App/types";

type EmptyObject = Record<any, never>;

interface LineChartProps {
    coinHistory: PriceHistory[] | EmptyObject;
    currentPrice: string;
    coinName: string;
}

export default LineChartProps;
