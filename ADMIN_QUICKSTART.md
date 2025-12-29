# Admin Panel Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Set Environment Variables

Add these to your `.env.local` file:

```
# Admin Credentials
ADMIN_EMAIL=your-email@lumewavedigital.com
ADMIN_PASSWORD=YourSecurePassword123

# Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM=onboarding@resend.dev

# Optional
NEXT_PUBLIC_BASE_URL=https://yoursite.com
```

### Step 2: Access Admin Panel

Visit: `https://yoursite.com/admin`

Log in with:
- **Email**: your-email@lumewavedigital.com
- **Password**: YourSecurePassword123

### Step 3: Explore Features

You'll see the dashboard with:
- 📊 Stats (Submissions, Subscribers)
- 📝 Quick Action Cards
- 🔗 Navigation to all features

---

## 📍 Admin Panel Pages

### 1. Dashboard (`/admin`)
**What**: Overview of your admin data
**See**: Total submissions, subscribers, quick action cards
**Use**: Check stats at a glance

### 2. Submissions (`/admin/submissions`)
**What**: All contact form submissions
**See**: List of submissions with details
**Do**: Click to view full details, email, or call

### 3. SEO Management (`/admin/seo`)
**What**: Manage page metadata for search engines
**See**: List of pages on the left, edit fields on the right
**Do**: Update title, description, keywords, OG image

---

## 💡 Common Tasks

### Check New Contact Submissions
1. Click **Submissions** in sidebar
2. See list of all contacts
3. Click any submission to see full details
4. Click **Email** or **Call** button

### Update Page Title & Description
1. Click **SEO Management** in sidebar
2. Select page from left panel
3. Edit **Page Title** (aim for 50-60 characters)
4. Edit **Meta Description** (aim for 150-160 characters)
5. Click **Save Changes**

### View Stats
1. Click **Dashboard** in sidebar
2. See total submissions and subscribers
3. Click cards to go to detailed pages

---

## 🔍 Understanding the Admin Panel

### The Sidebar (Left Side)
- **Navigation menu** to all features
- **Highlights** which page you're on
- **Mobile**: Tap ≡ icon to show/hide

### The Content Area (Center/Right)
- **Main page content** changes based on sidebar selection
- **Responsive design** works on all devices

### Dashboard Stats
- **Submissions**: Count of all contact form fills
- **Subscribers**: Count of newsletter signups

---

## ✅ What Gets Automatically Saved

When someone fills your contact form:
1. ✓ Form data saved to database
2. ✓ Notification email sent to `ADMIN_EMAIL`
3. ✓ Data shows in Submissions page
4. ✓ Submission count increases on dashboard

---

## 🎨 SEO Best Practices

### Page Title
- **Length**: 50-60 characters
- **Include**: Your main keyword
- **Example**: "Custom Web Design | LumeWave Digital"

### Meta Description
- **Length**: 150-160 characters
- **Include**: Call to action or value proposition
- **Example**: "Professional custom web design and development services. Let's build your online presence. Free consultation available."

### Keywords
- **Count**: 5-10 keywords
- **Format**: Comma separated
- **Example**: "web design, custom website, digital agency, branding"

### OG Image
- **Size**: 1200x630 pixels
- **Type**: JPG or PNG
- **Use**: Image shown when sharing on social media

---

## 🔐 Security Notes

✓ Only you and trusted team members should have access
✓ Use a strong password (mix of letters, numbers, symbols)
✓ Don't share credentials
✓ Log out when done (click **Logout** button)

---

## ❓ Troubleshooting

### "Login Failed" Error
- Check email and password are correct
- Make sure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set
- Try refreshing the page

### Can't see submissions
- Check if any forms were actually submitted
- Refresh the page
- Check database connection

### Email notifications not received
- Check `ADMIN_EMAIL` is correct
- Check `RESEND_API_KEY` is set
- Check spam/junk folder
- Verify `RESEND_FROM` is valid

### SEO changes not showing in Google
- Changes are saved immediately
- Google needs 1-3 days to re-crawl
- Check Google Search Console for status

---

## 📚 Need More Info?

- **Full Admin Documentation**: Read `ADMIN_PANEL.md`
- **Technical Architecture**: Check `ADMIN_ARCHITECTURE.md`
- **Implementation Details**: See `ADMIN_IMPLEMENTATION.md`

---

## 🎯 Admin Panel at a Glance

| Page | Purpose | Main Action |
|------|---------|------------|
| Dashboard | See overview stats | Click cards to view details |
| Submissions | Manage form responses | Click to view, email, or call |
| SEO | Update page metadata | Edit and save changes |

---

## 🚀 You're Ready!

Your admin panel is live and ready to use. No website load, no complicated setup, just a clean interface to manage everything.

**Go to**: `https://yoursite.com/admin` 🎉

---

Last Updated: December 28, 2025
