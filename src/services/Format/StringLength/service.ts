const stringLength = (string: string) => {
    if (string.length < 20) return string;
    return string.slice(0, 20) + "...";
};

export default stringLength;
