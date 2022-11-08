import React from 'react'
import './style.css'
import { Line } from 'react-chartjs-2'
import LineChartProps from './types'
import dateFormatter from '../../services/Format/Date/service'
import moment from 'moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { triggerAsyncId } from 'async_hooks'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
)

const LineChart: React.FC<LineChartProps> = ({coinHistory, coinName, currentPrice}) => {

    const coinPrice = []
    const coinTimestamp = []

    for (let i = coinHistory.length - 1; i >= 0; i--) {
        coinPrice?.push(coinHistory[i].price)
        coinTimestamp?.push(new Date(coinHistory[i].timestamp * 1000).toLocaleDateString())
    }


    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                pointRadius: 0,
                borderWidth: 1,
                fill: false,
                backgroundColor: '#6c63ff',
                borderColor: '#6c63ff'
                
            }
        ]
    }

    const options: any = {
            responsive: true,
            scales: {
                y: 
                    {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
            }
    }

    return (
        <>
            <Line data={data} options={options}/>
        </>
    )
}

export default LineChart