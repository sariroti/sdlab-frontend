import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers);

const wrapComponent = (
    <Router>
        <Route exact path="/" component={App}/>
    </Router>
)
ReactDOM.render(wrapComponent, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
