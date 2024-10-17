import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../context/AuthContext'; // Firebase Auth Context for global state

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state during registration
  const { setCurrentUser } = useAuth(); // Access the AuthContext
  const navigate = useNavigate(); // For redirection

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      
      // Set the newly registered user in the global context
      setCurrentUser(userCredential.user);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError('Failed to register. Please try again.');
      console.error(err.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
