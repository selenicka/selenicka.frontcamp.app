import React, {Component} from 'react';
import { Link } from 'react-router';

class NewsItem extends Component {
    render() {
        return (
            <div className="js-item">
                <div className="article-frame">
                    <div className="article">
                        <div className="article-wrapper">
                            {
                                this.props.value.image &&
                                <figure className="article-image">
                                    <img src={`/public/images/${this.props.value.image}`} height="200"/>
                                </figure>
                            }
                            <div className="article-content">
                                <h2>
                                    <Link to={`/article/${this.props.value._id}`}>{this.props.value.title}</Link>
                                </h2>
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