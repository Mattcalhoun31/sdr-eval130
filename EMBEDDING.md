# Embedding Growth Lab Voice AI on www.symmetrigrowth.com

This guide shows you how to embed the Growth Lab Voice AI widget on your website.

## 🎯 For Replit Deployment

### Step 1: Deploy to Replit

1. **Create a new Repl** or use your existing one
2. **Import this repository** or copy the files
3. **Set environment variables** in Replit Secrets:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
   AI_PROVIDER=openai
   NEXT_PUBLIC_CALENDAR_URL=https://calendar.app.google/your-calendar-link
   ```

   **Note:** Your actual API keys and calendar URL are in your `.env.local` file (not committed to git for security).

4. **Run the app** with `npm run dev` or deploy with Replit's deployment feature
5. **Note your Replit URL** (e.g., `https://your-app.repl.co`)

### Step 2: Embed on Your Homepage

Add this code to your **homepage HTML** (before the closing `</body>` tag):

```html
<!-- Growth Lab Voice AI Widget -->
<iframe
  id="growth-lab-voice-ai"
  src="https://your-app.repl.co"
  style="position: fixed; bottom: 0; right: 0; width: 100%; height: 100%; border: none; pointer-events: none; z-index: 9999;"
  allow="microphone"
></iframe>

<script>
  // Make only the widget clickable
  (function() {
    const iframe = document.getElementById('growth-lab-voice-ai');
    const style = document.createElement('style');
    style.textContent = `
      #growth-lab-voice-ai {
        pointer-events: none !important;
      }
      #growth-lab-voice-ai::after {
        content: '';
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 400px;
        height: 650px;
        pointer-events: auto;
        z-index: 10000;
      }
    `;
    document.head.appendChild(style);
  })();
</script>
```

**OR use this simpler approach (recommended):**

```html
<!-- Growth Lab Voice AI Widget - Simple Embed -->
<iframe
  src="https://your-app.repl.co"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 650px; border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 9999;"
  allow="microphone"
></iframe>
```

---

## 🎨 For WordPress Deployment

### Option 1: Using Custom HTML Block (Easiest)

1. **Edit your homepage** in WordPress
2. **Add a Custom HTML block**
3. **Paste this code:**

```html
<!-- Growth Lab Voice AI Widget -->
<iframe
  src="https://your-deployed-url.vercel.app"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 650px; border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 9999;"
  allow="microphone"
></iframe>
```

### Option 2: Using Theme Footer (Site-wide)

1. **Go to** Appearance → Theme Editor
2. **Open** `footer.php` (or use a child theme)
3. **Add before** `</body>`:

```html
<!-- Growth Lab Voice AI Widget -->
<iframe
  src="https://your-deployed-url.vercel.app"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 650px; border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 9999;"
  allow="microphone"
></iframe>
```

### Option 3: Using Insert Headers and Footers Plugin

1. **Install** "Insert Headers and Footers" plugin
2. **Go to** Settings → Insert Headers and Footers
3. **Add to Footer** section:

```html
<!-- Growth Lab Voice AI Widget -->
<iframe
  src="https://your-deployed-url.vercel.app"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 650px; border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); z-index: 9999;"
  allow="microphone"
></iframe>
```

---

## ⚙️ Customization Options

### Change Position

**Bottom Left:**
```css
style="position: fixed; bottom: 20px; left: 20px; ..."
```

**Top Right:**
```css
style="position: fixed; top: 20px; right: 20px; ..."
```

### Change Size

**Larger:**
```css
width: 450px; height: 700px;
```

**Smaller:**
```css
width: 350px; height: 600px;
```

### Show Only on Homepage

**WordPress PHP:**
```php
<?php if (is_front_page()) : ?>
  <!-- Growth Lab Voice AI Widget -->
  <iframe src="..." ...</iframe>
<?php endif; ?>
```

---

## 🚀 Deployment Options

### Recommended: Vercel (Free, Fast, Easy)

1. **Push code to GitHub**
2. **Go to** [vercel.com](https://vercel.com)
3. **Import repository**
4. **Add environment variables:**
   - `OPENAI_API_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
   - `AI_PROVIDER`
   - `NEXT_PUBLIC_CALENDAR_URL`
5. **Deploy!**
6. **Use your Vercel URL** in the embed code above

### Alternative: Netlify

1. **Push code to GitHub**
2. **Go to** [netlify.com](https://netlify.com)
3. **New site from Git**
4. **Add environment variables** in Site settings → Build & deploy → Environment
5. **Deploy!**

---

## 🔒 Security Notes

**Important:** The API keys shown in this document are already exposed from our conversation. Before deploying to production:

1. **Rotate OpenAI Key:**
   - Go to https://platform.openai.com/api-keys
   - Delete the old key
   - Create a new key
   - Update in your deployment

2. **Rotate Gemini Key:**
   - Go to https://aistudio.google.com/app/apikey
   - Delete the old key
   - Create a new key
   - Update in your deployment

---

## 📱 Mobile Considerations

The widget works on mobile, but voice recognition is limited:
- ✅ Works on mobile Chrome
- ✅ Works on mobile Safari (iOS 14.5+)
- ❌ Doesn't work on Firefox mobile

**Recommendation:** The widget will show a warning on unsupported browsers.

---

## 🧪 Testing Before Going Live

1. **Deploy to staging URL first**
2. **Test on:**
   - Desktop Chrome ✅
   - Desktop Safari ✅
   - Mobile Chrome ✅
   - Mobile Safari ✅
3. **Test conversation flow:**
   - Greeting plays automatically
   - Can ask questions
   - Calendar opens correctly
   - Brand colors look good

---

## 📊 What Happens Next

When a visitor arrives:
1. **Widget appears** in bottom-right corner (minimized)
2. **After 1 second** - AI speaks: "Hey, welcome to the Growth Lab, what brings you here?"
3. **Visitor can:**
   - Click microphone to talk
   - View conversation history
   - Click calendar to book meeting
   - Minimize/close widget

---

## 🎨 Brand Colors Used

- **Primary Orange:** #E87105
- **Secondary Orange:** #F89F05
- **Accent Yellow:** #FFBA00

These match your Symmetri Growth brand!

---

## 🆘 Troubleshooting

**Widget not showing?**
- Check browser console for errors
- Verify iframe `src` URL is correct
- Check z-index conflicts with other elements

**Voice not working?**
- Must use HTTPS (not HTTP)
- Check browser permissions for microphone
- Use Chrome or Safari

**API errors?**
- Verify API keys are set correctly
- Check API key quotas/limits
- Look at deployment logs

---

## 📞 Need Help?

- Check README.md for more details
- Test locally first with `npm run dev`
- Verify environment variables are set
