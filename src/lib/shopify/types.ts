/**
 * TypeScript types for Shopify Storefront API
 */

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  acceptsMarketing: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface ShopifyAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface ShopifyLoginResponse {
  customerAccessTokenCreate: {
    customerAccessToken: ShopifyAccessToken | null;
    customerUserErrors: ShopifyUserError[];
  };
}

export interface ShopifyCustomerResponse {
  customer: ShopifyCustomer | null;
}

export interface ShopifyUserError {
  field: string[] | null;
  message: string;
}

export interface ShopifySubscription {
  id: string;
  status: string;
  nextBillingDate: string;
  billingPolicy: {
    interval: string;
    intervalCount: number;
  };
  deliveryPolicy: {
    interval: string;
    intervalCount: number;
  };
  lines: {
    edges: Array<{
      node: {
        quantity: number;
        title: string;
        variantTitle: string;
      };
    }>;
  };
}

export interface SessionData {
  customerId: string;
  accessToken: string;
  email: string;
  expiresAt: string;
}

