interface DropdownProps {
    label: string,
    options: DropdownPropsOptions[],
    sortBy: string,
    direction: string,
    handleSortBy: (value: string) => void
}

interface DropdownPropsOptions {
    option: string,
    value: string
}

export { DropdownProps }