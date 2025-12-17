# Quick Start Guide - Admin Panel

## 🚀 Getting Started in 3 Steps

### Step 1: Start the Server
```bash
npm run dev
```

### Step 2: Open Admin Panel
Navigate to: **http://localhost:3000/admin/login**

### Step 3: Login
- **Email:** `admin@lumewavedigital.com`
- **Password:** `Admin@123`

---

## 📋 Quick Links

- **Admin Dashboard:** http://localhost:3000/admin/dashboard
- **Manage Projects:** http://localhost:3000/admin/projects
- **Manage Blogs:** http://localhost:3000/admin/blogs
- **Manage Services:** http://localhost:3000/admin/services
- **View Messages:** http://localhost:3000/admin/messages
- **Public Website:** http://localhost:3000

---

## ⚡ Quick Actions

### Add a New Project:
1. Go to http://localhost:3000/admin/projects
2. Click "+ Add New Project"
3. Fill form and save

### Edit a Blog:
1. Go to http://localhost:3000/admin/blogs
2. Click "Edit" on any blog
3. Update and save

### Update Services:
1. Go to http://localhost:3000/admin/services
2. Click "Edit" on any service
3. Modify description and save

---

## 🔐 Security Reminder

**Before deploying to production:**
1. Change admin credentials in `.env.local`
2. Use a strong password
3. Generate new `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

---

## ✅ Current Status

- ✅ Authentication: Working
- ✅ Projects Management: Working
- ✅ Blogs Management: Working
- ✅ Services Management: Working
- ✅ Data Storage: JSON file (`data/content.json`)
- ✅ Email Integration: Configured (Web3Forms)

---

## 📞 Need Help?

Check the full guide: `ADMIN_PANEL_GUIDE.md`
