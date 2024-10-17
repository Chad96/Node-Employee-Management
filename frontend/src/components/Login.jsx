import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Firebase Auth Context for global state
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state during login
    const { login } = useAuth(); // Access the login function from the AuthContext
    const navigate = useNavigate(); // For redirection

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner or disable button
        setError(''); // Reset error message

        try {
            await login(email, password); // Call the login method
            // Redirect to the home page (or dashboard) after successful login
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please check your email and password.');
            console.error(err.message);
        } finally {
            setLoading(false); // Stop the loading state
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
