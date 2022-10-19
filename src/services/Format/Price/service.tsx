const formatter = (str: string) => {
    const number = parseInt(str)
    const formatter = new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD'
    })
    
    return formatter.format(number)
}

export default formatter