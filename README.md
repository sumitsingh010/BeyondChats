# BeyondChats Article Viewer

A full-stack web app for scraping and displaying articles from BeyondChats blog.

## Features

- Scrapes articles from BeyondChats blog
- Displays articles in horizontal scrolling layout
- Search functionality
- Full-screen reading mode
- Product, Pricing, FAQ, and Contact pages

## Tech Stack

**Backend:** Node.js, Express 
**Frontend:** React, CSS

## Deployment on Render

This application is configured for easy deployment on Render using the `render.yaml` blueprint.

### Option 1: Deploy via Render Dashboard (Recommended)

1. Fork or push this repository to your GitHub account
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file
6. Click "Apply" to create the service
7. Your app will be live at `https://your-app-name.onrender.com`

### Option 2: Deploy as Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: beyondchats (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV=production`
5. Click "Create Web Service"

### Environment Variables

The application requires the following environment variables:
- `NODE_ENV=production` (for production deployment)
- `PORT` (automatically set by Render)

Optional:
- `OPENAI_API_KEY` (if using OpenAI features)

## Local Development Setup

### Backend
```bash
cd backend
npm install
node server.js
```
Runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

### Scrape Articles
```bash
cd backend
node scripts/scraper.js
```

## Project Structure
```
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── scripts/
│   └── data/
├── frontend/
│   ├── src/
│   └── public/
├── package.json (root - for deployment)
└── render.yaml (Render blueprint)
```

## Contact

Email: sengarsumit7047@gmail.com

Made by Sumit Singh Sengar
- Complete CRUD API for article management
