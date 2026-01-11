/**
 * GET /api/auth/session
 * Returns the current user session data
 */

import { NextResponse } from 'next/server';
import { getIronSession } from '@/lib/session';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_CUSTOMER_QUERY } from '@/lib/shopify/queries';
import { ShopifyCustomerResponse } from '@/lib/shopify/types';

export async function GET() {
  try {
    const session = await getIronSession();

    if (!session.user) {
      return NextResponse.json({ user: null });
    }

    // Check if token has expired
    const expiresAt = new Date(session.user.expiresAt);
    if (expiresAt < new Date()) {
      session.destroy();
      return NextResponse.json({ user: null, error: 'Session expired' });
    }

    // Optionally fetch fresh customer data from Shopify
    try {
      const customerData = await shopifyFetch<ShopifyCustomerResponse>({
        query: GET_CUSTOMER_QUERY,
        variables: {
          customerAccessToken: session.user.accessToken,
        },
      });

      if (!customerData.customer) {
        session.destroy();
        return NextResponse.json({ user: null, error: 'Invalid session' });
      }

      return NextResponse.json({
        user: {
          email: customerData.customer.email,
          firstName: customerData.customer.firstName,
          lastName: customerData.customer.lastName,
          id: customerData.customer.id,
        },
      });
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
      // Return cached session data if Shopify request fails
      return NextResponse.json({
        user: {
          email: session.user.email,
          id: session.user.customerId,
        },
      });
    }
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}

