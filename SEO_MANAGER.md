# SEO Manager

## Overview
A dynamic SEO management system that allows you to update SEO metadata for all pages without touching code or redeploying.

## How It Works
- SEO data is stored in `/data/seo.json`
- An admin panel at `/admin/seo` lets you edit SEO for any page
- Changes are saved to the JSON file and take effect immediately
- All pages dynamically load their SEO from this file

## Accessing the SEO Manager

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the admin panel:**
   ```
   http://localhost:3000/admin/seo
   ```

3. **Or in production:**
   ```
   https://yoursite.com/admin/seo
   ```

## Using the SEO Manager

### 1. Select a Page
- Click on any page in the left sidebar
- The form will load with current SEO data

### 2. Edit SEO Fields

**Page Title** (Required)
- Optimal length: 50-60 characters
- Shows in browser tabs and search results
- Example: "About Us - LumeWave Digital"

**Meta Description** (Required)
- Optimal length: 150-160 characters
- Shows in search results below the title
- Should be compelling and include keywords
- Example: "Learn about LumeWave Digital and our mission..."

**Keywords** (Optional)
- Comma-separated list
- Example: "digital innovation, SaaS development, growth"
- Note: Less important for modern SEO but still useful

**OpenGraph Image** (Optional)
- Image URL for social media sharing
- Recommended size: 1200x630 pixels
- Can be relative: `/og-home.jpg` or absolute URL
- Example: `/og-home.jpg`

### 3. Preview
- See how your page will look in Google search results
- Check character counts for optimal length

### 4. Save Changes
- Click "Save Changes" to update the JSON file
- Changes take effect on next page load
- No code changes or deployments needed!

## Adding New Pages

To add SEO for a new page:

1. **Add entry to `/data/seo.json`:**
   ```json
   "your-new-page": {
     "title": "Your Page Title",
     "description": "Your page description",
     "keywords": "keyword1, keyword2",
     "ogImage": "/og-image.jpg"
   }
   ```

2. **Add metadata to your page component:**
   ```tsx
   import { generateMetadata as genMeta } from '@/lib/seo';
   
   export const metadata = genMeta('your-new-page');
   ```

3. **Access via admin panel** - it will appear automatically

## Security Recommendations

⚠️ **Important:** The admin panel is currently unprotected. For production:

### Option 1: Add Simple Password Protection
Create `/app/admin/seo/layout.tsx`:
```tsx
"use client";
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && password === 'your-secret-password') {
              setAuthenticated(true);
            }
          }}
          placeholder="Enter admin password"
        />
      </div>
    );
  }

  return children;
}
```

### Option 2: Use NextAuth.js
Implement proper authentication with NextAuth.js for production use.

### Option 3: Environment-Based Access
Only enable the admin panel in development:
```tsx
// In admin/seo/page.tsx
if (process.env.NODE_ENV === 'production') {
  return <div>Access denied</div>;
}
```

## File Structure

```
├── app/
│   ├── admin/
│   │   └── seo/
│   │       └── page.tsx          # Admin panel UI
│   ├── api/
│   │   └── seo/
│   │       └── route.ts          # API for saving SEO data
│   └── [your-pages]/
│       └── page.tsx              # Uses generateMetadata()
├── data/
│   └── seo.json                  # SEO data storage
└── lib/
    └── seo.ts                    # SEO utility functions
```

## Best Practices

### Title Tags
- Include your brand name
- Put important keywords first
- Keep under 60 characters
- Make each page unique

### Meta Descriptions
- Write compelling copy
- Include a call-to-action
- Use active voice
- Keep under 160 characters
- Include target keywords naturally

### OpenGraph Images
- Use high-quality images
- Size: 1200x630 pixels
- Include text overlay if needed
- Test on multiple platforms

## Testing

1. **Preview in Admin Panel** - Use the built-in preview
2. **Test in Browser** - View source to see meta tags
3. **Google Rich Results Test** - https://search.google.com/test/rich-results
4. **Social Media Debuggers:**
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

## Troubleshooting

### Changes not appearing?
- Hard refresh the page (Cmd+Shift+R / Ctrl+Shift+R)
- Clear browser cache
- Check browser console for errors

### API errors?
- Ensure file permissions allow writing to `/data/seo.json`
- Check server logs for detailed errors

### Missing pages?
- Add the page to `/data/seo.json` first
- Ensure the page imports and exports metadata

## Future Enhancements

Consider adding:
- [ ] Image upload for OG images
- [ ] Bulk edit functionality
- [ ] SEO score checker
- [ ] Preview for different social platforms
- [ ] Audit log of changes
- [ ] Revert to previous versions
- [ ] Import/export SEO data
- [ ] Integration with Google Search Console
