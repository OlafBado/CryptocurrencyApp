interface NewsItemMarqueeProps {
    title: string,
    url: string,
    img?: {
        thumbnail: {
            contentUrl: string
        }
    } | null,
    time: string
}

export { NewsItemMarqueeProps }