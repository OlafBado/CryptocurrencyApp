interface SearchFormProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputResult: string,
    coinUrl: string[]
}

export { SearchFormProps }