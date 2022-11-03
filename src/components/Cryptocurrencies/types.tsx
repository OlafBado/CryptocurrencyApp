import { SingleCoinData } from '../App/types'

interface CryptocurrenciesProps {
    coins: SingleCoinData[],
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>)=> void,
    inputResult: string,
    isLoading: boolean
}

export { CryptocurrenciesProps }