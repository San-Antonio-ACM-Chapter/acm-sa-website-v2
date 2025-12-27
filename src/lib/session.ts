/**
 * Session management using iron-session
 * Provides secure, encrypted cookie-based sessions
 */

import { getIronSession as getSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  customerId: string;
  accessToken: string;
  email: string;
  expiresAt: string;
}

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required');
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'acm_sa_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  },
};

// Extend the iron-session types
declare module 'iron-session' {
  interface IronSessionData {
    user?: SessionData;
  }
}

// Helper function to get session with proper typing
export async function getIronSession() {
  return getSession<{ user?: SessionData }>(await cookies(), sessionOptions);
}

