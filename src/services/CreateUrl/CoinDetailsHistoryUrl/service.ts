const API_BASE= 'https://coinranking1.p.rapidapi.com/coin/'
const PARAM_COIN_ID = ''
const PARAM_REF_CURR = 'referenceCurrencyUuid=yhjMzLPhuIDl'
const PARAM_TIME_PERIOD = 'timePeriod='

const getCoinDetailsHistoryUrl = (id:string, timePeriod: string) => 
`${API_BASE}${id}/history?${PARAM_REF_CURR}&${PARAM_TIME_PERIOD}${timePeriod}`

export default getCoinDetailsHistoryUrl