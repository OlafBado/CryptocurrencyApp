import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from 'aws-amplify'
import { SingleNewsData } from '../../components/App/types'

export const fetchCoinNews = createAsyncThunk(
    'coinNewsSlice/coinNews',
    async (coin: string) => {
        const params = {
            'queryStringParameters': {coin: `Crypto ${coin}`}
        }
        try {
            const result = await API.get('cryptoApi', '/crypto/getNews', params)
            return result.articles
        } catch (err) {
            return err
        }
    }
)

interface InitialState {
    coinNewsStatus: string,
    error: string,
    news: SingleNewsData[],
}

const initialState: InitialState = {
    coinNewsStatus: '',
    error: '',
    news: [],
}

export const coinNewsSlice = createSlice({
    name: 'coinNews',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCoinNews.pending, (state) => {
                state.coinNewsStatus = 'loading'
            })
            .addCase(fetchCoinNews.fulfilled, (state, action) => {
                state.coinNewsStatus = 'succeeded'
                state.news = action.payload
            })
            .addCase(fetchCoinNews.rejected, (state, action) => {
                state.coinNewsStatus = 'failed'
                state.error = action.error.message!
            })
    }
})