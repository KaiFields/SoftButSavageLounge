import React, { useState } from 'react';

export default function UserAuth({ onAuth }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const [mode, setMode] = useState('login');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Mock authentication
    if (form.username && form.password) {
      setUser({ username: form.username });
      onAuth({ username: form.username });
    }
  }

  function handleLogout() {
    setUser(null);
    onAuth(null);
  }

  if (user) {
    return (
      <div className="user-auth">
        <span>Welcome, {user.username}!</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  }

  return (
    <form className="user-auth-form" onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
      <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'Need an account? Sign Up' : 'Have an account? Log In'}
      </button>
    </form>
  );
}
