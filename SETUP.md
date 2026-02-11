# ORDA Website - Setup Instructions

## 🔴 CRITICAL: Live Discord Member Count Setup

### **To show REAL member count (excluding bots):**

1. **Enable Discord Widget:**
   - Open Discord
   - Go to your Server Settings
   - Click "Widget" in the left sidebar
   - **Toggle ON "Enable Server Widget"** ← THIS IS REQUIRED!

2. **Get Your Server ID:**
   - In Discord: User Settings → Advanced → Enable Developer Mode
   - Right-click your server name → Copy Server ID
   - Example: `1234567890123456789`

3. **Update the Code:**
   - Open `script.js`
   - Find line 15: `const DISCORD_SERVER_ID = 'YOUR_SERVER_ID';`
   - Replace `YOUR_SERVER_ID` with your actual server ID
   - Save the file

4. **Result:**
   - Shows REAL Discord member count (excludes bots automatically)
   - Updates when you refresh the page
   - Professional and accurate

**Without this setup, it will show "43" as default.**

---

## ✨ Features Included

✅ **Enhanced Loading Screen** - Epic ORDA logo with spinning rings  
✅ **Live Member Count** - Real Discord members (no bots)  
✅ **Smooth Scrolling** - Buttery smooth navigation  
✅ **Animated Stats** - Numbers count up on scroll  
✅ **Clean Minimal FAQ** - Simple and professional  
✅ **YouTube Link** - Footer social media  
✅ **Mobile Responsive** - Works on all devices  

---

## 📝 Customization

### Change FAQ Questions:
Edit `index.html` around line 180

### Change Stats Numbers:
Edit `index.html` around line 145

### Add More Social Links:
Edit `footer-right` section in `index.html`

---

## 🚀 Deployment

Upload all files to your hosting:
- `index.html`
- `styles.css`
- `script.js`
- `logo-transparent.png`

Recommended hosts:
- Vercel (vercel.com)
- Netlify (netlify.com)
- GitHub Pages (pages.github.com)

Your ORDA website is ready to dominate! 💀
