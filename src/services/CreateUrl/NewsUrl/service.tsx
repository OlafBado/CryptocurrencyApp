const API_BASE = 'https://newsapi.org/v2/everything?pageSize=10&sortBy=publishedAt&language=en&apiKey=6c4cecd8f42848339d8f5ec708760227&'
const PARAM_Q = 'q='
// const PARAM_COUNT = 'count='
// const PARAM_OFFSET = 'offset='

const getNewNewsUrl = (
    query: string,
    ) => 
    
    `${API_BASE}${PARAM_Q}${query}`

export default getNewNewsUrl