# Subscription Database Setup

## Overview
All subscriber emails are now saved to a **Vercel Postgres** cloud database with automatic table creation and email delivery tracking.

## Environment Variables

Add these to your `.env.local` file:

```bash
# Resend Email (required)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=you@yourdomain.com

# Vercel Postgres (required - get from Vercel dashboard)
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=default
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=verceldb

# PDF settings (optional)
SUBSCRIPTION_PDF_PATH=insights.pdf

# Admin API access (optional but recommended)
ADMIN_API_KEY=your_secure_random_key
```

## Database Setup

### 1. Create Vercel Postgres Database

**Via Vercel Dashboard:**
1. Go to your project on [vercel.com](https://vercel.com)
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Copy all environment variables to your `.env.local`

**Via Vercel CLI:**
```bash
vercel env pull .env.local
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Schema

The `subscribers` table is created automatically on first subscription:

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_sent BOOLEAN DEFAULT FALSE
);
```

## Files

- **Database utility:** [lib/db.ts](lib/db.ts)
- **Subscription API:** [app/api/subscription/route.ts](app/api/subscription/route.ts)
- **Admin API:** [app/api/subscribers/route.ts](app/api/subscribers/route.ts)

## Usage

### View Subscribers (Admin API)

**Get all subscribers as JSON:**
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  http://localhost:3000/api/subscribers
```

**Export as CSV:**
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  http://localhost:3000/api/subscribers?format=csv \
  -o subscribers.csv
```

Response format:
```json
{
  "success": true,
  "count": 42,
  "subscribers": [
    {
      "id": 1,
      "email": "user@example.com",
      "subscribed_at": "2025-12-26T10:30:00.000Z",
      "email_sent": true
    }
  ]
}
```

## Features

✅ **Automatic table creation** – No manual SQL needed
✅ **Duplicate prevention** – Email uniqueness enforced
✅ **Delivery tracking** – Records if email was successfully sent
✅ **Timestamp logging** – Track when each subscription occurred
✅ **Admin API** – View and export subscriber list
✅ **CSV export** – Download subscriber data

## Security Notes

- Set a strong `ADMIN_API_KEY` for the admin endpoint
- In production, use proper authentication (NextAuth, Clerk, etc.)
- Vercel Postgres connections are SSL-encrypted by default
- Never commit `.env.local` to git (already in `.gitignore`)

## Local Development

For local development, you can use the same Vercel Postgres database (recommended) or set up a local Postgres instance.

## Deployment

When deploying to Vercel:
1. Environment variables are automatically available if database is linked
2. No additional configuration needed
3. Database scales automatically with your app

## Troubleshooting

**"Database connection failed"**
- Verify `POSTGRES_URL` is set correctly
- Check Vercel dashboard for database status

**"Unauthorized" on admin endpoint**
- Ensure `ADMIN_API_KEY` matches in request header
- Format: `Authorization: Bearer YOUR_KEY`

**Duplicate email handling**
- On duplicate submissions, the timestamp updates but a new record isn't created
- The `email_sent` status updates to reflect the latest attempt
