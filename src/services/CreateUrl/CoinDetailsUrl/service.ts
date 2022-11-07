const API_BASE = 'https://coinranking1.p.rapidapi.com/coin/'

const getCoinDetailsUrl = (id: string) => 
`${API_BASE}${id}`

export default getCoinDetailsUrl