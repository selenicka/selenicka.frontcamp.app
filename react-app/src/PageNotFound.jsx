import React, {Component} from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>Page Not Found.</h1>
                <p>Go to <Link to="/">Home Page</Link></p>
            </div>
        )
    }
}

export default PageNotFound;