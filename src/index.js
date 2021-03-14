import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createStore from "./store";
import App from "./Components/App";
import Login from "./Components/Login";

const history = createBrowserHistory();
const store = createStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/login" component={Login} />
                <Route render={() => (<div>Page not found ¯\_(ツ)_/¯</div>)} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.querySelector("#root"));
