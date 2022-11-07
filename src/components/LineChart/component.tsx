import React from 'react'
import './style.css'
import { Line, Chart } from 'react-chartjs-2'
import LineChartProps from './types'

const LineChart: React.FC<LineChartProps> = ({coinHistory, coinName, currentPrice}) => {

    const coinPrice = []
    const coinTimestamp = []

    for (let i = 0; i < coinHistory.length; i++) {
        coinPrice?.push(coinHistory[i].price)
        coinTimestamp?.push(new Date(coinHistory[i].timestamp).toLocaleString())
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
                
            }
        ]
    }

    const options = {
        scales: {
            yAxes : [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    console.log(coinPrice)
    console.log(coinTimestamp)

    return (
        <div>lineChart
            {/* <Line data={data} options={options} /> */}
            <Chart type='line'/>
        </div>
    )
}

export default LineChart