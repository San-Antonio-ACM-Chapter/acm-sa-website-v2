/**
 * POST /api/auth/logout
 * Handles customer logout and session destruction
 */

import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { LOGOUT_MUTATION } from '@/lib/shopify/queries';
import { getIronSession } from '@/lib/session';

export async function POST() {
  try {
    const session = await getIronSession();

    // If there's a session with access token, revoke it from Shopify
    if (session.user?.accessToken) {
      try {
        await shopifyFetch({
          query: LOGOUT_MUTATION,
          variables: {
            customerAccessToken: session.user.accessToken,
          },
        });
      } catch (error) {
        // Continue with local logout even if Shopify revocation fails
        console.error('Failed to revoke Shopify token:', error);
      }
    }

    // Destroy the session
    session.destroy();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}

