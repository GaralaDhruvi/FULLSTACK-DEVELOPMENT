// src/components/Register.js
import React, { useState } from 'react';
import api from '../services/api';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg('Passwords do not match');
      return;
    }
    if (!agree) {
      setMsg('You must agree to the Terms and Conditions');
      return;
    }
    try {
      await api.post('/api/auth/register', {
        name: `${firstName} ${lastName}`,
        email,
        password
      });
      setMsg('Registration successful! You can now log in.');
      setTimeout(() => window.location.href = '/login', 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          className="auth-input"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="auth-input"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="auth-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="auth-input"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
          /> I agree to the Terms and Conditions
        </label>
        <button className="auth-button" type="submit">Register</button>
        {msg && <div className={`register-msg ${msg.includes('successful') ? 'success' : 'error'}`}>{msg}</div>}
      </form>
      <p className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
