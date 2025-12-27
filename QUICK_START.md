# 🚀 Quick Start - 3 Steps to Get Running

## Step 1: Get Shopify Credentials (10 min)

### A. Your Store Domain
Find your Shopify domain: `your-store.myshopify.com`

### B. Create API Token
1. Shopify Admin → Settings → Apps → **Develop apps**
2. **Create an app** → Name it "Next.js Portal"
3. **Configuration** → **Storefront API** → Enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_customer_tags`
   - `unauthenticated_write_customers`
   - `unauthenticated_read_customers`
4. **API credentials** → **Install app** → Copy token (starts with `shpat_`)

### C. Enable Customer Accounts
Shopify Admin → Settings → **Customer accounts** → Enable **"New customer accounts"**

---

## Step 2: Configure Environment (2 min)

Edit `src/.env.local`:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=shpat_xxxxxxxxxxxxx
SESSION_SECRET=$(openssl rand -base64 32)
NODE_ENV=development
```

Or generate session secret separately:
```bash
openssl rand -base64 32
```

---

## Step 3: Test It (5 min)

```bash
# Start dev server
npm run dev
```

1. Create test customer in Shopify Admin → Customers → Add customer
2. Go to `http://localhost:3000/login`
3. Login with customer email/password
4. Should redirect to `/profile` ✅

---

## ✅ Done!

**Full documentation:** See `SHOPIFY_SETUP.md` for complete details.

**Troubleshooting:** If login fails, verify:
- Customer exists in Shopify and has password set
- Environment variables are correct (no typos)
- Store domain doesn't include `https://`

