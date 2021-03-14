import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { login, STATUS_OK } from "../taskRepository";
import { loginSuccess } from "../actions";
import { userFriendlyError } from "../errorUtils";

export default function Login() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const onLoginClick = async () => {
        const loginResponse = await login(name, password);
        if (loginResponse.status == STATUS_OK) {
            setError(null);
            dispatch(loginSuccess(loginResponse.message.token));
            dispatch(push('/'));
        }
        else {
            setError(userFriendlyError(loginResponse.message))
        }
    };

    return (
        <div className="section login">
            <div>
                <label>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className="error">{error}</div>}

            <button onClick={onLoginClick}>Login</button>
        </div>
    );
};
