/**
 * POST /api/auth/login
 * Handles customer login via Shopify Storefront API
 */

import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { LOGIN_MUTATION, GET_CUSTOMER_QUERY } from '@/lib/shopify/queries';
import { getIronSession } from '@/lib/session';
import {
  ShopifyLoginResponse,
  ShopifyCustomerResponse,
} from '@/lib/shopify/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Step 1: Authenticate with Shopify
    const loginData = await shopifyFetch<ShopifyLoginResponse>({
      query: LOGIN_MUTATION,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    const { customerAccessToken, customerUserErrors } =
      loginData.customerAccessTokenCreate;

    if (customerUserErrors.length > 0) {
      return NextResponse.json(
        { error: customerUserErrors[0].message },
        { status: 401 }
      );
    }

    if (!customerAccessToken) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Step 2: Fetch customer details
    const customerData = await shopifyFetch<ShopifyCustomerResponse>({
      query: GET_CUSTOMER_QUERY,
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
    });

    if (!customerData.customer) {
      return NextResponse.json(
        { error: 'Failed to fetch customer data' },
        { status: 500 }
      );
    }

    // Step 3: Create session
    const session = await getIronSession();
    session.user = {
      customerId: customerData.customer.id,
      accessToken: customerAccessToken.accessToken,
      email: customerData.customer.email,
      expiresAt: customerAccessToken.expiresAt,
    };
    await session.save();

    return NextResponse.json({
      success: true,
      customer: {
        email: customerData.customer.email,
        firstName: customerData.customer.firstName,
        lastName: customerData.customer.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

