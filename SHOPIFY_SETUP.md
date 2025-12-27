# Shopify Authentication Integration - Setup Guide

## ✅ Project Structure - COMPLETE

All files have been created and are ready. Your project structure now includes:

```
src/
├── lib/
│   ├── shopify/
│   │   ├── client.ts          ✅ GraphQL client
│   │   ├── queries.ts         ✅ GraphQL queries
│   │   └── types.ts           ✅ TypeScript types
│   └── session.ts             ✅ Session management
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts   ✅ Login endpoint
│   │       ├── logout/route.ts  ✅ Logout endpoint
│   │       └── session/route.ts ✅ Session check endpoint
│   ├── login/page.tsx         ✅ Login UI
│   └── profile/page.tsx       ✅ Profile/Dashboard
├── middleware.ts              ✅ Route protection
└── .env.local                 ⚠️ NEEDS CONFIGURATION
```

---

## 📋 Setup Checklist

### Step 1: Configure Shopify (Required)

#### A. Get Your Store Domain
Your Shopify store domain looks like: `your-store.myshopify.com`

#### B. Create a Storefront API Token

1. Go to **Shopify Admin** → **Settings** → **Apps and sales channels**
2. Click **"Develop apps"** (top right)
3. If prompted, click **"Allow custom app development"**
4. Click **"Create an app"**
   - Name it: `Next.js Customer Portal` (or any name you prefer)
   - Click **"Create app"**

5. Go to **Configuration** tab → **Storefront API** section
6. Click **"Configure"**
7. Enable these scopes (permissions):
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_customer_tags`
   - ✅ `unauthenticated_write_customers`
   - ✅ `unauthenticated_read_customers`

8. Click **"Save"**
9. Go to **API credentials** tab
10. Under **"Storefront API access token"**, click **"Install app"**
11. Copy the **Storefront API access token** (starts with `shpat_`)
    ⚠️ **Important:** Save this token securely - you won't be able to see it again!

#### C. Enable Customer Accounts

1. **Shopify Admin** → **Settings** → **Customer accounts**
2. Set accounts to: **"Accounts are optional"** or **"Accounts are required"**
3. ⚠️ **Important:** Enable **"New customer accounts"**
   - This is the modern version with better API support
   - If you see "Classic customer accounts", switch to "New"

---

### Step 2: Generate Session Secret

Run this command in your terminal to generate a secure random secret:

```bash
openssl rand -base64 32
```

Copy the output (it will look something like: `aB3dEfGh4iJkLmNoPqRsTuVwXyZ1234567890ABCDE=`)

---

### Step 3: Configure Environment Variables

Open `src/.env.local` and replace the placeholder values:

```bash
# Your Shopify store domain (from Step 1A)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Your Storefront API token (from Step 1B)
SHOPIFY_STOREFRONT_API_TOKEN=shpat_xxxxxxxxxxxxx

# Your session secret (from Step 2)
SESSION_SECRET=aB3dEfGh4iJkLmNoPqRsTuVwXyZ1234567890ABCDE=

# Environment
NODE_ENV=development
```

---

### Step 4: Test the Integration

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Create a test customer in Shopify:**
   - Shopify Admin → **Customers** → **Add customer**
   - Set email and password
   - Check "Send account invite" if you want the customer to set their own password

3. **Test the login flow:**
   - Navigate to: `http://localhost:3000/login`
   - Enter the customer email and password
   - You should be redirected to `/profile`

4. **Test the profile page:**
   - Should show customer information
   - "Manage Subscription" button should link to Shopify's customer portal

5. **Test logout:**
   - Click "Logout" on profile page
   - Should redirect back to login

---

## 🎯 Features Implemented

### Authentication
- ✅ Email/password login via Shopify
- ✅ Secure session management (encrypted cookies)
- ✅ Protected routes (middleware)
- ✅ Automatic session expiry handling
- ✅ Logout functionality

### User Management
- ✅ Profile page with customer information
- ✅ Link to Shopify customer portal for subscription management
- ✅ Password reset (redirects to Shopify)
- ✅ Account creation (redirects to Shopify)

### Security
- ✅ HttpOnly cookies (protected from XSS)
- ✅ Session encryption via iron-session
- ✅ Token expiry validation
- ✅ Server-side session validation

---

## 🔗 Integration Points

### Login Flow
```
User → /login → POST /api/auth/login → Shopify API → Create Session → Redirect to /profile
```

### Protected Routes
```
User → /profile → Middleware checks session → Allow/Deny → Page renders
```

### Subscription Management
```
User → /profile → Click "Manage Subscription" → Redirect to Shopify Customer Portal
```

---

## 📧 Email Marketing Setup (Future)

For newsletters and email marketing, you have these options:

### Option 1: Shopify Email (Built-in)
- **Shopify Admin** → **Marketing** → **Automations**
- Free for up to 10,000 emails/month
- Automatically syncs with customer data
- Built-in unsubscribe handling

### Option 2: Klaviyo (Recommended for Advanced)
- Integrates directly with Shopify
- Advanced segmentation and automation
- Syncs customer subscription preferences
- [Install Klaviyo from Shopify App Store](https://apps.shopify.com/klaviyo-email-marketing)

### Option 3: Mailchimp
- Connect via Shopify App Store
- Syncs customer data automatically
- [Install Mailchimp from Shopify App Store](https://apps.shopify.com/mailchimp)

**Unsubscribe Compliance:**
All these services automatically handle unsubscribe links and compliance (CAN-SPAM, GDPR) for you.

---

## ⚠️ Known Limitations

1. **Full Subscription Editing**: Shopify Storefront API doesn't expose full subscription editing capabilities. Users are redirected to Shopify's customer portal for subscription changes.

2. **Password Reset**: Custom password reset requires email infrastructure. We redirect users to Shopify's built-in password reset page.

3. **Account Creation**: Account creation redirects to Shopify's registration page to maintain consistency.

---

## 🚀 Next Steps

Once authentication is working, you can:

1. **Customize the UI**: Update login/profile pages with your branding
2. **Add navigation**: Add login/profile links to your main navigation
3. **Fetch subscription data**: Use Shopify Admin API for more detailed subscription info
4. **Add email marketing**: Choose and configure an email service
5. **Production deployment**: Update environment variables in your hosting platform

---

## 🐛 Troubleshooting

### "Invalid email or password" error
- Verify the customer exists in Shopify Admin → Customers
- Check that customer has a password set (not just invited)
- Test with Shopify's own login page first: `https://your-store.myshopify.com/account/login`

### "Session expired" message
- Sessions expire after 30 days (configurable in `src/lib/session.ts`)
- Customer access tokens from Shopify also expire (~30 days)

### Build fails with "Missing environment variables"
- This is expected if `.env.local` isn't configured yet
- Make sure you've completed Step 3 above
- For production builds, set environment variables in your hosting platform

### Middleware warning about deprecation
- Next.js 16 has deprecated the "middleware" convention in favor of "proxy"
- This is just a warning and doesn't affect functionality
- Can be addressed in a future refactor

---

## 📝 API Reference

### POST /api/auth/login
Authenticates a customer with Shopify.

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "customer": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### POST /api/auth/logout
Destroys the current session.

**Response:**
```json
{
  "success": true
}
```

### GET /api/auth/session
Returns the current user session data.

**Response:**
```json
{
  "user": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "id": "gid://shopify/Customer/123456789"
  }
}
```

---

## 🎨 Customization

All UI components use CSS variables from your `globals.css`:
- `--accent` - Primary button color
- `--foreground` - Text color
- `--background` - Background color
- `--border` - Border color
- `--font-size-*` - Typography scale
- `--spacing-*` - Spacing scale
- `--radius-*` - Border radius scale

These automatically adapt to light/dark mode!

---

## 📚 Resources

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [iron-session Documentation](https://github.com/vvo/iron-session)
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Shopify Customer Accounts](https://help.shopify.com/en/manual/customers/customer-accounts)

---

**Questions or Issues?** Check the code comments in each file for detailed explanations of how everything works!

