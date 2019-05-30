import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import './index.css';
import App from './App';
import Login from './components/login/login';
import Register from './components/register/register';
import reduxLogger from 'redux-logger';
import './index.css';
import ForgotPassword from './components/forgot-password/forgot-password';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const store = createStore(reducers, applyMiddleware(thunk, reduxLogger));

const wrapComponent = (
    <Router>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> 
        <Route path="/forgot-password" component={ForgotPassword} />
    </Router>
)
ReactDOM.render(
    <Provider store={store}>
        {wrapComponent}
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
