/**
 * POST /api/auth/logout
 * Logout endpoint - to be implemented with Stripe
 */

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Authentication not yet implemented' },
    { status: 501 }
  );
}

