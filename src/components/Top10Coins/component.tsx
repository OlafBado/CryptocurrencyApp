import React, { useEffect, useState } from 'react'
import './style.css'
import fetchCoins from '../../services/FetchCoins/service'
import getNewUrl from '../../services/CreateUrl/service'

const Top10Coins = () => {

    const [url, setUrl] = useState<string>(getNewUrl('marketCap', 'desc', '10', '0'))
    const [coins, setCoins] = useState()

    useEffect(() => {
        const result = fetchCoins(url)
        console.log(result)
    }, [url])

    return (
        <main>
            <div className="container">
                <h2>Top 10 coins</h2>
            </div>
        </main>
    )
}

export default Top10Coins