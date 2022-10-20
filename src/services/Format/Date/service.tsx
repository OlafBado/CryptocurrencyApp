const dateFormatter = (number: number) => {
    const date = new Date(number)
    console.log(date.toUTCString())
    return date.toUTCString()
}

export default dateFormatter