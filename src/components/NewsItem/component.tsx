import React from "react";
import "./style.css";
import { NewsItemProps } from "./types";
import dateMoment from "../../services/Format/DateMoment/service";
import { DEFAULT_IMG } from "../../services/constants";

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    const { publishedAt, description, url, urlToImage, title, source } = news;

    return (
        <a href={url} target="__blank">
            <article className="news-item__wrapper">
                <div className="news-item__upper-section">
                    <h3 className="news-item__upper-section__title">{title}</h3>
                    <img
                        className="news-item__upper-section__img"
                        src={urlToImage ? urlToImage : DEFAULT_IMG}
                        alt="Photo relating to the news"
                    />
                </div>
                <p className="news-item__middle-section__description">
                    {description}
                </p>
                <div className="news-item__lower-section">
                    <h4 className="news-item__lower-section__source">
                        {source?.name}
                    </h4>
                    <p className="news-item__lower-section__date">
                        {dateMoment(publishedAt)}
                    </p>
                </div>
            </article>
        </a>
    );
};

export default NewsItem;
