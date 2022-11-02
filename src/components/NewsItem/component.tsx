import React from 'react'
import './style.css'
import { NewsItemProps } from './types'
import moment from 'moment'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const defaultImg = 'https://cdn-icons-png.flaticon.com/512/1213/1213797.png'

const NewsItem:React.FC<NewsItemProps> = ({news}) => {
    const {width} = useWindowDimensions()
    const {datePublished, description, name, provider, url, image} = news

    if (width < 1000) {
        return (
            <li>
                <a href={url} target='__blank'>
                    <article className='newsItem__wrapper newsItem__wrapper--mobile'>
                        <div className='newsItem__upper-section--mobile'>
                            <h4 className='newsItem__upper-section__title--mobile'>{name}</h4>
                        </div>
                        <div className='newsItem__lower-section--mobile'>
                            <img className='newsItem__lower-section__img--mobile' src={image?.thumbnail?.contentUrl || defaultImg} alt="news image" />
                        </div>
                    </article>
                </a>
            </li>
        )
    }

    return (
        <li>
        <a href={url} target='__blank'>
            <article className='newsItem__wrapper'>
                <div className='newsItem__upper-section'>
                    <h4 className='newsItem__upper-section__title'>{name}</h4>
                    <img className='newsItem__upper-section__img' src={image?.thumbnail?.contentUrl || defaultImg} alt="news image" />
                </div>
                <div className='newsItem__middle-section'>
                    <p className='newsItem__middle-section__description'>{description}</p>
                </div>
                <div className='newsItem__lower-section'>
                    <div className='newsItem__lower-section__author'>
                        <img className='newsItem__lower-section__author__img' src={provider[0]?.image?.thumbnail?.contentUrl || defaultImg} alt="news author image" />
                        <h5 className='newsItem__lower-section__author__name'>{provider[0].name}</h5>
                    </div>
                    <p className='newsItem__lower-section__date'>{moment(datePublished).fromNow()}</p>
                </div>
            </article>
        </a>
        </li>
    )
}

export default NewsItem