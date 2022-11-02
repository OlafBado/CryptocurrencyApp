const dateFormatter = (data: number | string) => {
    const date = new Date(data)
    return date.toUTCString()
}

export default dateFormatter