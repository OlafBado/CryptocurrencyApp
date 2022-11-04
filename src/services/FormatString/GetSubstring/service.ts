const getSubstring = (string: string, start: string, end: string) => 
    string.substring(string.lastIndexOf(start), 
    string.lastIndexOf(end))
    .replace(start, '')


export default getSubstring