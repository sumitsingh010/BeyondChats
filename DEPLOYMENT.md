# Deployment Guide

Complete guide to deploy the BeyondChats application to production.

## Backend Deployment Options

### Option 1: Render (Recommended - Free Tier)

1. Create account at https://render.com

2. Create new Web Service:
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

3. Add Environment Variables:
   ```
   PORT=5000
   OPENAI_API_KEY=your_actual_key
   ```

4. Deploy and copy the URL (e.g., `https://your-app.onrender.com`)

### Option 2: Railway

1. Go to https://railway.app

2. Create New Project → Deploy from GitHub

3. Configure:
   - Root Directory: `backend`
   - Start Command: `npm start`

4. Add variables in Settings

5. Copy public URL

### Option 3: Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
cd backend
heroku create beyondchats-api

# Set environment variables
heroku config:set OPENAI_API_KEY=your_key

# Deploy
git subtree push --prefix backend heroku main

# Or if using main repo:
git push heroku main
```

### Option 4: Self-Hosted (VPS/Cloud)

```bash
# On your server (Ubuntu example)
sudo apt update
sudo apt install nodejs npm

# Clone repository
git clone your-repo-url
cd beyondchats-assignment/backend

# Install dependencies
npm install

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start server.js --name "beyondchats-api"

# Setup nginx reverse proxy
sudo apt install nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/beyondchats

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/beyondchats /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt (optional)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

1. Go to https://vercel.com

2. Import GitHub repository

3. Configure:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. Update API URL:
   - Before deploying, update `frontend/src/App.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.onrender.com/api/articles';
   ```

5. Deploy

6. Get live URL (e.g., `https://your-app.vercel.app`)

### Option 2: Netlify

1. Go to https://netlify.com

2. Add New Site → Import from Git

3. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

4. Update API URL in code before deployment

5. Deploy

### Option 3: GitHub Pages

```bash
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json:
{
  "homepage": "https://yourusername.github.io/beyondchats-assignment",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

# Update API URL in src/App.js

# Deploy
npm run deploy
```

### Option 4: AWS S3 + CloudFront

```bash
# Build the app
cd frontend
npm run build

# Install AWS CLI
# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://beyondchats-app

# Upload build files
aws s3 sync build/ s3://beyondchats-app

# Enable static website hosting
aws s3 website s3://beyondchats-app --index-document index.html

# Setup CloudFront (optional, for CDN)
```

## Complete Deployment Workflow

### Step 1: Prepare Backend

1. Push code to GitHub
2. Deploy backend to Render/Railway
3. Note the backend URL
4. Test API endpoints

### Step 2: Configure Frontend

1. Update API URL in `frontend/src/App.js`:
```javascript
const API_URL = 'https://your-backend-url.onrender.com/api/articles';
```

2. Commit and push changes

### Step 3: Deploy Frontend

1. Deploy to Vercel/Netlify
2. Get live URL
3. Test the application

### Step 4: Initialize Data

1. SSH into backend server or use Render shell
2. Run scraper:
```bash
npm run scrape
```

3. (Optional) Run update script:
```bash
npm run update-articles
```

## Environment Variables

### Backend (.env)
```
PORT=5000
OPENAI_API_KEY=sk-...your-key...
NODE_ENV=production
```

### Frontend (if using .env)
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Then use in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## Post-Deployment Checklist

- [ ] Backend is accessible via URL
- [ ] API endpoints return correct data
- [ ] Frontend loads without errors
- [ ] Articles display correctly
- [ ] Filter toggles work
- [ ] Responsive design works on mobile
- [ ] CORS is properly configured
- [ ] HTTPS is enabled (production)
- [ ] Environment variables are set
- [ ] Database has initial data

## Testing Deployed Application

```bash
# Test backend API
curl https://your-backend-url.onrender.com/api/articles

# Should return JSON array of articles
```

Visit frontend URL in browser and verify:
1. Articles load
2. Original/Updated filters work
3. Read more/less buttons work
4. Responsive on mobile
5. No console errors

## Monitoring & Maintenance

### Backend Monitoring

1. **Render Dashboard**:
   - Check logs
   - Monitor CPU/memory usage
   - View deployment history

2. **Error Logging**:
   Add to `server.js`:
   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!' });
   });
   ```

3. **Uptime Monitoring**:
   - Use UptimeRobot (free)
   - Monitor API availability
   - Get alerts on downtime

### Database Backup

```bash
# Backup articles.json regularly
# Add to package.json scripts:
"backup": "cp data/articles.json data/articles.backup.json"
```

## Custom Domain (Optional)

### For Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

### For Backend (Render)
1. Go to Settings → Custom Domains
2. Add domain
3. Update DNS records

## Troubleshooting Deployment

### Backend Issues

**Port binding error**:
```javascript
// Ensure server.js uses process.env.PORT
const PORT = process.env.PORT || 5000;
```

**Puppeteer not working**:
```json
// Add to package.json
"dependencies": {
  "puppeteer": "^21.6.1",
  "puppeteer-core": "^21.6.1"
}
```

Or use alternative scraping methods in production.

**API not accessible**:
- Check CORS settings
- Verify environment variables
- Check logs for errors

### Frontend Issues

**API connection failed**:
- Verify API_URL is correct
- Check CORS headers on backend
- Ensure backend is running

**Build fails**:
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Blank page after deployment**:
- Check browser console for errors
- Verify homepage in package.json
- Check build output directory

## Cost Estimation

### Free Tier Deployment

- **Backend**: Render (Free tier - 750 hours/month)
- **Frontend**: Vercel (Free unlimited static hosting)
- **Domain**: Namecheap ($8-12/year, optional)
- **SSL**: Free (Let's Encrypt / Vercel)

**Total**: $0-12/year

### Production Deployment

- **Backend**: Render ($7/month)
- **Database**: MongoDB Atlas ($0-9/month)
- **Frontend**: Vercel Pro ($20/month, optional)
- **Domain**: $12/year

**Total**: $84-384/year

## Quick Deploy Commands

```bash
# Backend (Render via Git)
git push origin main  # Auto-deploys

# Frontend (Vercel via Git)
git push origin main  # Auto-deploys

# Manual frontend deploy
cd frontend
npm run build
vercel --prod
```

## Success Criteria

Your application is successfully deployed when:

1. ✅ Backend API is accessible publicly
2. ✅ Frontend is live and loads quickly
3. ✅ All features work in production
4. ✅ Mobile responsive
5. ✅ HTTPS enabled
6. ✅ No console errors
7. ✅ Data persists correctly
8. ✅ Fast load times (<3s)

## Live Demo Links

Update your README with:

```markdown
## Live Demo

- **Frontend**: https://beyondchats-app.vercel.app
- **Backend API**: https://beyondchats-api.onrender.com
- **API Documentation**: https://beyondchats-api.onrender.com/api/articles
```

## Final Notes

1. Always test locally before deploying
2. Use environment variables for sensitive data
3. Monitor logs regularly
4. Keep dependencies updated
5. Backup data regularly
6. Use HTTPS in production
7. Implement proper error handling
8. Add loading states in UI
9. Optimize images and assets
10. Document deployment process

Your application is now live and accessible worldwide! 🚀
