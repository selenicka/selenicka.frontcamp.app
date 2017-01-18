import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import AddArticle from './src/AddArticle.jsx';
import PageNotFound from './src/PageNotFound.jsx';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';

import styles from './sass/styles.scss';

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
            <Route path="/article/add" name="add-article" component={AddArticle}/>
            <Route path="*" component={PageNotFound}/>
        </Router>
    ),
    document.getElementById('app')
);