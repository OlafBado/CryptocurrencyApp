const formatter = (str: string) => {
    const number = parseFloat(str);
    const maximumSignificantDigits = checkDigits(str);
    const formatter = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits,
    });

    return formatter.format(number);
};

export default formatter;

const checkDigits = (str: string) => {
    if (!str) return;
    switch (str.indexOf(".")) {
        case 1:
            switch (str[0]) {
                case "0":
                    return 6;
                default:
                    return 3;
            }
        case 2:
            return 4;
        case 3:
            return 5;
        case 4:
            return 6;
        case 5:
            return 7;
        case 6:
            return 8;
    }
};
