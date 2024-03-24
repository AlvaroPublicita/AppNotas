import { useState } from 'react';
import userService from '../services/userService.js';

const RegisterForm = ({ setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await userService.register({ username, password, name });
            setNotification('Registration successful');
        } catch (error) {
            setNotification('Registration failed');
        }
    };

    return (
        <form onSubmit={handleRegister}>
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
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={name}
                    name="Name"
                    onChange={({ target }) => setName(target.value)}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
// Path: client/src/services/userService.js