'use client'; // ✅ Next.js 13+ required

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
// ✅ Fix the path here
import { auth } from '../../firebase/firebaseConfig'; // ✅ Use relative path OR fix alias

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
