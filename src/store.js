import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from "./reducers";
import { LOGIN_SUCCESS, LOGOUT, loginSuccess, logout } from "./actions";

export default history => initAuth(createStore(
    createRootReducer(history),
    applyMiddleware(authPersistMiddleware, routerMiddleware(history))));

const authTokenKey = "authToken";

const initAuth = store => {
    const storedAuthToken = localStorage.getItem(authTokenKey);
    storedAuthToken && store.dispatch(loginSuccess(storedAuthToken));

    window.addEventListener('storage', () => {
        const storedAuthToken = localStorage.getItem(authTokenKey);
        if (storedAuthToken) {
            store.dispatch(loginSuccess(storedAuthToken));
        } else {
            store.dispatch(logout());
        };
    })
    
    return store;
}

const authPersistMiddleware = store => next => action => {
    try {
        if (action.type == LOGIN_SUCCESS) {
            localStorage.setItem(authTokenKey, action.token);
        }

        if (action.type == LOGOUT) {
            localStorage.removeItem(authTokenKey);
        }


    } catch (err) {
        console.error("Caught an exception!", err)
    }

    return next(action);
}