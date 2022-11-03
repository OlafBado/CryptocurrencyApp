import React from 'react'
import './style.css'
import { NewsItemMarqueeProps } from './types'
import dateMoment from '../../services/Format/DateMoment/service'

const defaultImg = 'https://cdn-icons-png.flaticon.com/512/1213/1213797.png'

const NewsItemMarquee: React.FC<NewsItemMarqueeProps> = ({title, img, url, time}) => {
    return (
        <li>
            <a href={url} target='__blank'>
                <article className='newsItem__wrapper--mobile'>
                    <div className='newsItem__upper-section--mobile'>
                        <h4 className='newsItem__upper-section__title--mobile'>{title}</h4>
                    </div>
                    {dateMoment(time)}
                    <div className='newsItem__lower-section--mobile'>
                        <img className='newsItem__lower-section__img--mobile' src={img?.thumbnail?.contentUrl || defaultImg} alt="news image" />
                    </div>
                </article>
            </a>
        </li>
    )
}

export default NewsItemMarquee