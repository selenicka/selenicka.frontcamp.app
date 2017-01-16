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
                    console.log(response);
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
        const numbers = [1, 2, 3, 4, 5];

        return (
            <div>
                <h1>{this.state.title}</h1>
                <Link to="/asdfsdf" activeClassName="active">Bob</Link>
                <Link to="/article/add" activeClassName="active">article</Link>
                <NewsList numbers={this.state.items}/>
            </div>
        );
    }
}

export default App;