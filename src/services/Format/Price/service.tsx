
const formatter = (str: string) => {
    const number = parseFloat(str)
    const formatter = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 5
    })
    
    return formatter.format(number)
}

export default formatter