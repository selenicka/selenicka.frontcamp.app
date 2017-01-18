import React, {Component} from 'react';

class NewsItem extends Component {
    render() {
        let link = '/article' + this.props.value._id,
            imageSrc = '/public/images/' + this.props.value.image;

        return (
            <div className="js-item">
                <div className="article-frame">
                    <div className="article">
                        <div className="article-wrapper">
                            <figure className="article-image">
                                <img src={imageSrc} height="200"/>
                            </figure>
                            <div className="article-content">
                                <h2><a href={link}>{this.props.value.title}</a></h2>
                                <p>{this.props.value.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;