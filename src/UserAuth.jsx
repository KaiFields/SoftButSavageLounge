

import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function UserAuth({ onAuth }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ email: '', avatar_url: '' });


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleProfileChange(e) {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });
        if (error) throw error;
        setUser(data.user);
        onAuth(data.user);
        fetchProfile(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password
        });
        if (error) throw error;
        setUser(data.user);
        onAuth(data.user);
        fetchProfile(data.user);
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
      // On redirect, Supabase will handle session
    } catch (err) {
      setError(err.message || 'Google login error');
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    setError('');
    setLoading(true);
    setResetSent(false);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(form.email);
      if (error) throw error;
      setResetSent(true);
    } catch (err) {
      setError(err.message || 'Password reset error');
    } finally {
      setLoading(false);
    }
  }

  async function fetchProfile(userObj) {
    if (!userObj) return;
    // Example: fetch profile from public.users table if you have one
    // const { data, error } = await supabase.from('users').select('*').eq('id', userObj.id).single();
    // setProfile(data);
    setProfile({ email: userObj.email, avatar_url: '' });
    setProfileForm({ email: userObj.email, avatar_url: '' });
  }

  async function handleProfileSave() {
    setError('');
    setLoading(true);
    try {
      // Example: update profile in public.users table if you have one
      // const { error } = await supabase.from('users').update(profileForm).eq('id', user.id);
      // if (error) throw error;
      setProfile(profileForm);
      setEditingProfile(false);
    } catch (err) {
      setError(err.message || 'Profile update error');
    } finally {
      setLoading(false);
    }
  }


  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    onAuth(null);
  }


  if (user) {
    return (
      <div className="user-auth">
        <span>Welcome, {profile?.email || user.email || user.id}!</span>
        {profile && !editingProfile && (
          <div style={{ margin: '12px 0' }}>
            <div>Email: {profile.email}</div>
            <div>Avatar: {profile.avatar_url ? <img src={profile.avatar_url} alt="avatar" style={{width:32,height:32,borderRadius:'50%'}} /> : 'None'}</div>
            <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
          </div>
        )}
        {editingProfile && (
          <form onSubmit={e => { e.preventDefault(); handleProfileSave(); }} style={{ margin: '12px 0' }}>
            <input name="email" value={profileForm.email} onChange={handleProfileChange} placeholder="Email" />
            <input name="avatar_url" value={profileForm.avatar_url} onChange={handleProfileChange} placeholder="Avatar URL" />
            <button type="submit" disabled={loading}>Save</button>
            <button type="button" onClick={() => setEditingProfile(false)}>Cancel</button>
          </form>
        )}
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  }

  return (
    <div className="user-auth-form" style={{ marginBottom: 16 }}>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
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
        <button type="submit" disabled={loading}>{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Need an account? Sign Up' : 'Have an account? Log In'}
        </button>
      </form>
      <button onClick={handleGoogleLogin} style={{ marginTop: 8, background: '#fff', color: '#333', border: '1px solid #ccc' }} disabled={loading}>
        Continue with Google
      </button>
      <button type="button" style={{ marginTop: 8, background: 'none', color: '#cfa87a', border: 'none', textDecoration: 'underline' }}
        onClick={handleResetPassword} disabled={loading || !form.email}>
        Forgot password?
      </button>
      {resetSent && <div style={{ color: 'green', marginTop: 8 }}>Password reset email sent!</div>}
      {error && <div style={{ color: 'salmon', marginTop: 8 }}>{error}</div>}
    </div>
  );
}
