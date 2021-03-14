import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { logout, newTask } from "../actions";

export const TopBar = ({ }) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    return (
        <div className="section topBar">
            <button className="newTask" onClick={() => dispatch(newTask())}>New Task</button>
            {
                auth.token
                    ? <button onClick={() => dispatch(logout())}>Logout</button>
                    : <button onClick={() => dispatch(push('/login'))}>Login</button>
            }
        </div>);
}