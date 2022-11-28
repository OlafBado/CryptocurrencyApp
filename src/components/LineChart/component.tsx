import React from "react";
import "./style.css";
import { Line } from "react-chartjs-2";
import LineChartProps from "./types";
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
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart: React.FC<LineChartProps> = ({
    coinHistory,
    coinName,
    currentPrice,
}) => {
    let coinPrice: string[] = [];
    let coinTimestamp: string[] = [];

    if (Object.keys(coinHistory).length !== 0) {
        coinHistory.map(({ price, timestamp }) => {
            coinPrice.unshift(price);
            coinTimestamp.unshift(
                new Date(timestamp * 1000).toLocaleDateString()
            );
        });
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                pointRadius: 0,
                borderWidth: 1,
                fill: false,
                backgroundColor: "#6c63ff",
                borderColor: "#6c63ff",
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
