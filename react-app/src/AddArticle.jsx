import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

class AddArticle extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            source: '',
            content: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        let urlAPI = 'http://localhost:3000/article/save',
            request = new Request(urlAPI),
            myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        let requestInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify(this.state)
        };

        console.log(this);

        fetch(request, requestInit)
         .then(r => r.json())
         .then(function (data) {
            console.log('Request succeeded with JSON response', data);
             browserHistory.push('add');
         })
         .catch(function (error) {
            console.log('Request failed', error);
         });
    }

    handleChange(field, e) {
        var nextState = this.state;

        nextState[field] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div id="container">
                <header>
                    <div className="wrapper">
                        <div className="title">
                            <Link to="/">News Aggregator</Link>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="wrapper">
                        <h1>Add Article</h1>
                        <form onSubmit={this.handleSubmit.bind(this)} id="addArticle">
                            <div className="control">
                                <label>Title</label>
                                <input
                                    className="control-text"
                                    type="text"
                                    required="required"
                                    value={this.state.title}
                                    onChange={this.handleChange.bind(this, 'title')}
                                />
                            </div>
                            <div className="control">
                                <label>Source</label>
                                <input
                                    className="control-text"
                                    type="text"
                                    required="required"
                                    value={this.state.source}
                                    onChange={this.handleChange.bind(this, 'source')}
                                />
                            </div>
                            <div className="control">
                                <label>Text</label>
                                <input
                                    className="control-text"
                                    type="text"
                                    required="required"
                                    value={this.state.content}
                                    onChange={this.handleChange.bind(this, 'content')}
                                />
                            </div>
                            <button type="submit" className="btn-primary">Save article</button>
                        </form>
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

export default AddArticle;