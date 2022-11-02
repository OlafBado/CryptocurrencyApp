const API_BASE = 'https://bing-news-search1.p.rapidapi.com/news/search?sortBy=Date&freshness=Day&textFormat=Raw&safeSearch=Off&setLang=EN&'
const PARAM_Q = 'q='
const PARAM_COUNT = 'count='
const PARAM_OFFSET = 'offset='

const getNewNewsUrl = (
    query: string,
    count: string, 
    offset: string) => 
    
    `${API_BASE}${PARAM_Q}${query}&${PARAM_COUNT}${count}&${PARAM_OFFSET}${offset}`

export default getNewNewsUrl