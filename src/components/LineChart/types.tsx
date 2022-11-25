import { PriceHistory } from "../App/types";
import { EmptyObject } from "../GlobalStats/types";

interface LineChartProps {
    coinHistory: PriceHistory[] | EmptyObject;
    currentPrice: string;
    coinName: string;
}

export default LineChartProps;
