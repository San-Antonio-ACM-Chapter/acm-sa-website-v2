/**
 * GET /api/auth/session
 * Session endpoint - to be implemented with Stripe
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { error: 'Authentication not yet implemented' },
    { status: 501 }
  );
}

