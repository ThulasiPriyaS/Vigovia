import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // TODO: Integrate signup logic
    alert('Account created!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: 36, borderRadius: 16, boxShadow: '0 4px 24px rgba(80,40,120,0.08)', minWidth: 340 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: '#351c5c' }}>Sign Up</h2>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} required />
        </div>
        <button type="submit" style={{ width: '100%', background: '#6c2eb7', color: 'white', fontWeight: 600, padding: 12, border: 'none', borderRadius: 8, fontSize: 18, marginBottom: 12, cursor: 'pointer' }}>Sign Up</button>
    </form>
  );
};

export default Signup; 