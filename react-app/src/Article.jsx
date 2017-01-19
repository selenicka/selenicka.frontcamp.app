import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';

class Article extends Component {
    constructor (){
        super();
        this.state = {
            article: {},
            title: ''
        };
    }

    componentWillMount(){
        let urlAPI = 'http://localhost:3000/article/' + this.props.routeParams.articleId,
            request = new Request(urlAPI);

        let requestInit = {
            method: 'GET',
            mode: 'cors'
        };
        
        var self = this;

        fetch(request, requestInit)
            .then(r => r.json())
            .then((response) => {
                if (response.status === 'ok'){
                    self.setState({
                        article: response.article,
                        title: response.title
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    formatDate(date) {
        let MM = {0:"January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June", 6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"};
        let publishedDate = new Date(date);

        return `${ publishedDate.getDate() } ${ MM[publishedDate.getMonth()] } ${ publishedDate.getFullYear() }`;
    }

    handleSubmit(e) {
        e.preventDefault();

        let urlAPI = 'http://localhost:3000/article/delete/' + this.props.routeParams.articleId,
            request = new Request(urlAPI);

        let requestInit = {
            method: 'GET',
            mode: 'cors'
        };

        fetch(request, requestInit)
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
                browserHistory.push('/');
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    render() {
        const article = this.state.article;

        return (
            <div id="container">
                <header>
                    <div className="wrapper">
                        <div className="title">
                            <Link to="/">{this.state.title}</Link>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="wrapper">
                        <h1>{article.title}</h1>
                        {
                            article.source &&
                            <div className="article-source">
                                <span>Source: {article.source}</span>
                            </div>
                        }
                        {
                            article.publishedAt &&
                            <div className="article-published">
                                <time dateTime={article.publishedAt}>{this.formatDate(article.publishedAt)}</time>
                            </div>
                        }
                        {
                            article.image &&
                            <img src={`/public/images/${article.image}`} height="200"/>
                        }
                        <p>{article.description}</p>
                        <button type="submit" className="btn-primary" onClick={this.handleSubmit.bind(this)}>Remove Article</button>
                    </div>
                </section>
                <footer>
                    <div className="wrapper">
                        <p>
                            Powered by <a href="https://newsapi.org">NewsAPI</a>
                        </p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Article;