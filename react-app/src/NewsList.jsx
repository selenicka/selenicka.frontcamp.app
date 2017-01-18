import React, {Component} from 'react';
import NewsItem from './NewsItem.jsx';

class NewsList extends Component {
    render() {
        const articles = this.props.articles;
        const listItems = articles.map((item, key) =>
            <NewsItem key={key} value={item} />
        );

        return (
            <div className="news-wrapper">
                <div className="newsList">{listItems}</div>
            </div>
        );
    }
}

export default NewsList;