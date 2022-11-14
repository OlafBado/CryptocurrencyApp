import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from 'aws-amplify'
import { SingleNewsData } from '../../components/App/types'

export const fetchCryptocurrencyNews = createAsyncThunk(
    'cryptocurrencyNewsSlice/cryptocurrencyNews',
    async () => {
        const params = {
            'queryStringParameters': {
                coin: 'Cryptocurrency'
            }
        }
        try {
            const result = await API.get('cryptoApi', '/crypto/getNews', params)
            console.log(result)
            return result.articles
        } catch (err) {
            return err
        }
    }
)

interface InitialState {
    status: string,
    error: string,
    news: SingleNewsData[],
}

const initialState: InitialState = {
    status: '',
    error: '',
    news: [],
}

export const cryptocurrencyNewsSlice = createSlice({
    name: 'cryptocurrencyNews',
    initialState,
    reducers: {
        setCryptocurrencyNews: (state, action) => {
            state.news = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCryptocurrencyNews.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCryptocurrencyNews.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.news = action.payload
            })
            .addCase(fetchCryptocurrencyNews.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message!
            })
    }
})

export const { setCryptocurrencyNews } = cryptocurrencyNewsSlice.actions