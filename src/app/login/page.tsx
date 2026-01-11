'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SHOPIFY_STORE_DOMAIN } from '@/lib/shopify/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Redirect to profile on success
      router.push('/profile');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Redirect to Shopify's password reset page
    const resetUrl = `https://${SHOPIFY_STORE_DOMAIN}/account/reset`;
    window.open(resetUrl, '_blank');
  };

  return (
    <main className="container" style={{ paddingTop: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      <p style={{ marginBottom: '2rem' }}>Access your ACM San Antonio account</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--error-bg, #fee)',
              color: 'var(--error-text, #c00)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: 'var(--font-size-base)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
            }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: 'var(--font-size-base)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            fontSize: 'var(--font-size-base)',
            fontWeight: 600,
            backgroundColor: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            transition: 'var(--transition-fast)',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          style={{
            padding: '0.5rem',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--accent)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Forgot password?
        </button>
      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
        <p>
          Don't have an account?{' '}
          <a
            href={`https://${SHOPIFY_STORE_DOMAIN}/account/register`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}


