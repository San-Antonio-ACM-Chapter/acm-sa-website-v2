'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SHOPIFY_STORE_DOMAIN } from '@/lib/shopify/client';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  id: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (!data.user) {
        router.push('/login');
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error('Failed to fetch session:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      setLoggingOut(false);
    }
  };

  const handleManageSubscription = () => {
    // Redirect to Shopify customer account portal
    window.location.href = `https://${SHOPIFY_STORE_DOMAIN}/account`;
  };

  if (loading) {
    return (
      <main className="container" style={{ paddingTop: '2rem' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <main className="container" style={{ paddingTop: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>My Profile</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.7 }}>
          Manage your ACM San Antonio account
        </p>
      </div>

      {/* User Info Card */}
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.5rem',
        }}
      >
        <h2 style={{ marginBottom: '1rem', fontSize: 'var(--font-size-xl)' }}>Account Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>Email:</span>
            <span>{user.email}</span>
          </div>
          {user.firstName && (
            <div>
              <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>Name:</span>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Management Card */}
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.5rem',
        }}
      >
        <h2 style={{ marginBottom: '1rem', fontSize: 'var(--font-size-xl)' }}>Subscription Management</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--foreground)', opacity: 0.8 }}>
          View and manage your subscription, payment methods, and billing information through our secure
          customer portal.
        </p>
        <button
          onClick={handleManageSubscription}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: 'var(--font-size-base)',
            fontWeight: 600,
            backgroundColor: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
        >
          Manage Subscription
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: 'var(--font-size-base)',
            fontWeight: 600,
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            cursor: loggingOut ? 'not-allowed' : 'pointer',
            opacity: loggingOut ? 0.6 : 1,
            transition: 'var(--transition-fast)',
          }}
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>

        <a
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: 'var(--font-size-base)',
            fontWeight: 600,
            backgroundColor: 'transparent',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'var(--transition-fast)',
          }}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}

