import axios from 'axios'

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        'tiers[0]': '1',
        orderBy: 'change',
        orderDirection: 'desc',
        limit: '10',
        offset: '0'
    },
    headers: {
        'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
    };
    
axios.request(options).then(function (response) {
    // console.log(response.data);
}).catch(function (error) {
    console.error(error);
});

const fetchCoins = async (url: string) => {

    const options = {
        headers: {
            'X-RapidAPI-Key': '2081c14c4dmshd151c93e0f27c2cp140d7bjsn9c3017090a59',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    }

    try {
        const result = await axios.get(url, options)
        return result.data
    } catch {
        return 'error'
    }

}

export default fetchCoins