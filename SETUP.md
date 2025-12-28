# Quick Setup Guide

## First Time Setup

### 1. Install Dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### 2. Configure API Key (Optional)

Edit `backend/.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_api_key_here
```

If you don't have an API key, the app will still work but skip the AI rewriting feature.

### 3. Start the Backend

```bash
cd backend
npm start
```

Server will run on http://localhost:5000

### 4. Scrape Articles

In a new terminal:
```bash
cd backend
npm run scrape
```

This will fetch 5 oldest articles from BeyondChats and save them to `data/articles.json`

### 5. (Optional) Update Articles with AI

```bash
cd backend
npm run update-articles
```

This will:
- Search each article title on Google
- Scrape top 2 results
- Use OpenAI to rewrite the article
- Add citations

### 6. Start the Frontend

In a new terminal:
```bash
cd frontend
npm start
```

App will open at http://localhost:3000

## Quick Commands

### Backend Commands
```bash
npm start              # Start server
npm run dev            # Start with nodemon (auto-reload)
npm run scrape         # Scrape BeyondChats articles
npm run update-articles # Update articles with AI
```

### Frontend Commands
```bash
npm start              # Start development server
npm run build          # Build for production
```

## Testing the APIs

### Get all articles
```bash
curl http://localhost:5000/api/articles
```

### Get single article
```bash
curl http://localhost:5000/api/articles/1
```

### Create article
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Article","content":"Test content"}'
```

### Update article
```bash
curl -X PUT http://localhost:5000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{"content":"Updated content"}'
```

### Delete article
```bash
curl -X DELETE http://localhost:5000/api/articles/1
```

## Common Issues

### Backend won't start
- Check if port 5000 is free
- Change PORT in .env if needed

### Scraper fails
- Check internet connection
- Website structure may have changed
- Try again (temporary issues)

### Frontend can't connect to backend
- Ensure backend is running
- Check console for errors
- Verify API_URL in src/App.js

### Puppeteer installation fails
```bash
npm install puppeteer --ignore-scripts
```

## Project Complete!

You now have:
- ✅ Web scraper for BeyondChats
- ✅ JSON database with articles
- ✅ Complete CRUD APIs
- ✅ AI article enhancement script
- ✅ React frontend with professional UI
- ✅ Full documentation
