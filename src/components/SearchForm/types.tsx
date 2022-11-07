interface SearchFormProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputResult: string,
    coinUrl: string[],
    sortBy: string,
    direction: string,
    handleSortBy: (sortBy: string) => void
}

export { SearchFormProps }