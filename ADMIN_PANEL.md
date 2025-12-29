# Admin Panel Documentation

## Overview

Your website now includes a professional, separate admin panel that doesn't impact your main website's performance. The admin panel is completely isolated and managed on the backend, ensuring zero performance overhead for your visitors.

## Accessing the Admin Panel

1. Navigate to: `https://yoursite.com/admin`
2. Log in with your admin credentials
3. You'll see the admin dashboard with all your management tools

## Admin Panel Features

### 1. **Dashboard**
The main landing page shows:
- **Total Submissions**: Count of all contact form submissions
- **Total Subscribers**: Count of all newsletter subscribers
- Quick action cards to navigate to different sections
- Links to all management features

### 2. **Contact Submissions**
Manage all form submissions from your contact form:
- View all contact form submissions in a list
- Click any submission to view full details
- See user information: name, email, phone, service, and message
- Quick action buttons to:
  - Send an email reply
  - Call the user directly
- Submission timestamps for tracking

### 3. **SEO Management**
Manage SEO metadata for your website pages without touching code:
- **Page Selection**: Choose which page to edit from the sidebar
- **Edit Fields**:
  - Page Title (50-60 characters recommended)
  - Meta Description (150-160 characters recommended)
  - Keywords (comma-separated)
  - OpenGraph Image URL (for social media sharing)
- **Real-time Preview**: See how your page will appear in Google search results
- **Character Counter**: Automatic feedback on title and description length
- **Save & Reset**: Save your changes or reset to the last saved version

## How the Admin Panel Works

### Separation from Main Website
- The admin panel is served from `/admin` route, completely separate from your main website
- Admin operations are handled by dedicated API routes in `/api/`
- No additional load on your main website visitors
- Database operations are optimized and don't affect frontend performance

### Database Storage
- **Contact Submissions**: Stored in `contact_submissions` table
- **Subscribers**: Stored in `subscribers` table
- **SEO Data**: Stored in `data/seo.json` file

### Email Notifications
When someone submits the contact form:
1. Data is saved to the database
2. You receive an email notification with the full submission details
3. The submission also appears in your admin dashboard

## Environment Variables Required

Make sure these are set in your `.env.local` or hosting platform:

```
# Email Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=onboarding@resend.dev
ADMIN_EMAIL=your-email@lumewavedigital.com

# Admin Authentication
ADMIN_EMAIL=your-email@lumewavedigital.com
ADMIN_PASSWORD=your_secure_password

# Optional
NEXT_PUBLIC_BASE_URL=https://yoursite.com
```

## Managing Submissions

### Viewing Submissions
1. Go to **Submissions** in the admin sidebar
2. See a list of all form submissions
3. Click on any submission to see full details on the right panel
4. Information includes:
   - User name and contact details
   - Service they're interested in
   - Their complete requirement/message
   - When they submitted the form

### Responding to Submissions
- Click the **Email** button to compose a reply
- Click the **Call** button to call them directly
- All contact information is automatically linked

## Managing SEO

### How to Update SEO
1. Go to **SEO Management** in the admin sidebar
2. Select the page you want to edit from the left sidebar
3. Edit the following fields:
   - **Title**: The page title shown in browser tab and Google results
   - **Description**: The meta description shown under the title in search results
   - **Keywords**: Keywords related to the page content
   - **OpenGraph Image**: Image shown when sharing on social media

### SEO Best Practices
- **Title**: 50-60 characters, include your main keyword
- **Description**: 150-160 characters, compelling preview of page content
- **Keywords**: 5-10 relevant keywords, comma-separated
- **OG Image**: 1200x630 pixels for optimal display on social media

### When Changes Take Effect
- Changes are saved immediately to your database
- SEO metadata is used when pages are served
- Search engines will pick up new metadata on next crawl

## Authentication & Security

### Login
- Admin panel is protected by email/password authentication
- Session stored in browser's sessionStorage
- Auto-clears when you close the browser

### Credentials
- Email: Set in `ADMIN_EMAIL` environment variable
- Password: Set in `ADMIN_PASSWORD` environment variable

### Security Notes
- Only share admin credentials with trusted team members
- Change your password regularly
- Admin panel should only be accessible to you or your team
- All database operations are server-side for security

## Sidebar Navigation

The admin sidebar provides quick access to:
- **Dashboard**: Overview and statistics
- **Submissions**: View and respond to form submissions
- **SEO Management**: Manage page metadata
- **Back to Website**: Return to your main website
- **Logout**: Log out of the admin panel

## Mobile Experience

The admin panel is fully responsive:
- **Mobile**: Click the hamburger menu (≡) to open sidebar
- **Tablet**: Sidebar collapses to icons with text on hover
- **Desktop**: Full sidebar always visible

## Performance

### Zero Impact on Website
- Admin operations don't affect your main website
- Separate routes and database connections
- Optimized API calls for dashboard statistics
- No additional server load for visitors

## Troubleshooting

### Can't log in?
- Check your email and password are correct
- Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in environment variables
- Try logging out and in again

### SEO changes not showing up?
- Changes are saved immediately
- Google may take a few days to re-crawl and update
- Check Google Search Console for SEO status

### Not receiving submission emails?
- Check `RESEND_API_KEY` is set correctly
- Check `ADMIN_EMAIL` in environment variables is correct
- Check your email spam folder
- Verify `RESEND_FROM` is a valid Resend sender

### Dashboard shows 0 submissions/subscribers?
- This is correct if you haven't received any submissions yet
- Statistics update in real-time as new data comes in

## API Endpoints (Backend)

The following API endpoints power the admin panel:

- `POST /api/contact` - Save contact form submission
- `GET /api/submissions` - Get all contact submissions
- `GET /api/subscribers-count` - Get total subscriber count
- `POST /api/seo` - Update SEO data
- `GET /api/seo` - Get SEO data
- `POST /api/auth/admin` - Admin authentication

These are internal APIs and should not be called directly from the frontend outside the admin panel.

## Getting Help

If you need to:
- Add more pages to SEO management: Contact your developer
- Change admin credentials: Update environment variables
- Add more features: Reach out to your development team

---

**Last Updated**: December 28, 2025
**Admin Panel Version**: 1.0
