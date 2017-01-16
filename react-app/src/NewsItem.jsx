import React, {Component} from 'react';

class NewsItem extends Component {
    render() {
        return (
            <div className="article-frame">
                <div className="article">{this.props.value.title}</div>
                <div className="article">{this.props.value.author}</div>
            </div>
        );
    }
}

export default NewsItem;