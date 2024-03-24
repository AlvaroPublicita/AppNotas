import { useState } from 'react';
import userService from '../services/userService.js';

const LoginForm = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await userService.login({ username, password });
            setUser(user);
            setNotification('Login successful');
        } catch (error) {
            setNotification('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;

// Path: client/src/services/userService.js
