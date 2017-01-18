import React, {Component} from 'react';
import { Router, Route, Link, browserHistory  } from 'react-router';
import NewsList from './src/NewsList.jsx';

class App extends Component {
    constructor (){
        super();
        this.state = {
            items: [],
            title: ''
        };
    }

    componentWillMount(){
        let urlAPI = 'http://localhost:3000/',
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
                        items: response.articles,
                        title: response.title
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const articles = this.state.items;

        return (
            <div id="container">
                <header>
                    <div className="wrapper">
                        <div className="title">{this.state.title}</div>
                    </div>
                </header>
                <section>
                    <div className="wrapper">
                        <h1>Top stories</h1>
                        <NewsList articles={articles}/>
                        <Link to="/article/add" id="addBtn" className="btn-primary" activeClassName="active">Add Article</Link>
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

export default App;