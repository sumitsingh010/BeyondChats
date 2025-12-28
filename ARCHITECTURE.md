# Architecture & Data Flow Diagram

## System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                            CLIENT LAYER (Browser)                          ║
║                                                                            ║
║  ┌──────────────────────────────────────────────────────────────────┐   ║
║  │                    React Frontend (Port 3000)                     │   ║
║  │                                                                    │   ║
║  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │   ║
║  │  │   Header    │  │   Filters    │  │   Article Cards      │   │   ║
║  │  │  Component  │  │  (Toggles)   │  │  (Original/Updated)  │   │   ║
║  │  └─────────────┘  └──────────────┘  └──────────────────────┘   │   ║
║  │                                                                    │   ║
║  │  State Management: useState, useEffect                            │   ║
║  │  HTTP Client: Axios                                               │   ║
║  └────────────────────────────┬───────────────────────────────────┘   ║
╚════════════════════════════════╪═══════════════════════════════════════╝
                                  │
                                  │ HTTP Requests
                                  │ (GET /api/articles)
                                  │
╔════════════════════════════════╪═══════════════════════════════════════╗
║                   SERVER LAYER (Port 5000)                               ║
║                                ▼                                          ║
║  ┌────────────────────────────────────────────────────────────────┐    ║
║  │              Express.js REST API Server                         │    ║
║  │                                                                  │    ║
║  │  CORS Middleware ─► JSON Parser ─► Routes                      │    ║
║  └────────────────────────────┬──────────────────────────────────┘    ║
║                                │                                         ║
║                                ▼                                         ║
║  ┌────────────────────────────────────────────────────────────────┐    ║
║  │                    API Routes Layer                             │    ║
║  │                                                                  │    ║
║  │  GET    /api/articles         ─► getAllArticles()              │    ║
║  │  GET    /api/articles/:id     ─► getArticleById(id)            │    ║
║  │  POST   /api/articles         ─► createArticle(data)           │    ║
║  │  PUT    /api/articles/:id     ─► updateArticle(id, data)       │    ║
║  │  DELETE /api/articles/:id     ─► deleteArticle(id)             │    ║
║  └────────────────────────────┬──────────────────────────────────┘    ║
║                                │                                         ║
║                                ▼                                         ║
║  ┌────────────────────────────────────────────────────────────────┐    ║
║  │                   Database Layer (db.js)                        │    ║
║  │                                                                  │    ║
║  │  readArticles()   ──► Read from JSON file                      │    ║
║  │  writeArticles()  ──► Write to JSON file                       │    ║
║  │  CRUD Operations  ──► In-memory manipulation                   │    ║
║  └────────────────────────────┬──────────────────────────────────┘    ║
╚════════════════════════════════╪═══════════════════════════════════════╝
                                  │
                                  ▼
╔═══════════════════════════════════════════════════════════════════════╗
║                        DATA STORAGE LAYER                              ║
║                                                                         ║
║  ┌───────────────────────────────────────────────────────────────┐   ║
║  │              backend/data/articles.json                        │   ║
║  │                                                                 │   ║
║  │  [                                                              │   ║
║  │    {                                                            │   ║
║  │      "id": 1234567890,                                          │   ║
║  │      "title": "Article Title",                                  │   ║
║  │      "content": "Article content...",                           │   ║
║  │      "url": "https://beyondchats.com/...",                      │   ║
║  │      "isUpdated": false,                                        │   ║
║  │      "references": [],                                          │   ║
║  │      "scrapedAt": "2025-12-28T..."                              │   ║
║  │    }                                                            │   ║
║  │  ]                                                              │   ║
║  └───────────────────────────────────────────────────────────────┘   ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## Phase 1: Web Scraping Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SCRAPER SCRIPT (scraper.js)                       │
└────────────────────────────────┬────────────────────────────────────────┘
                                  │
                                  │ 1. Launch Puppeteer
                                  ▼
                    ┌──────────────────────────────┐
                    │   BeyondChats Website        │
                    │   beyondchats.com/blogs      │
                    └──────────────┬───────────────┘
                                  │
                                  │ 2. Find last page number
                                  ▼
                    ┌──────────────────────────────┐
                    │  Navigate to last page       │
                    │  /blogs/page/X/              │
                    └──────────────┬───────────────┘
                                  │
                                  │ 3. Extract article metadata
                                  ▼
                    ┌──────────────────────────────┐
                    │  Get first 5 articles:       │
                    │  - Title                     │
                    │  - URL                       │
                    │  - Excerpt                   │
                    │  - Image                     │
                    │  - Date                      │
                    └──────────────┬───────────────┘
                                  │
                                  │ 4. Visit each article URL
                                  ▼
                    ┌──────────────────────────────┐
                    │  Scrape full content         │
                    │  from article pages          │
                    └──────────────┬───────────────┘
                                  │
                                  │ 5. Save to database
                                  ▼
                    ┌──────────────────────────────┐
                    │  articles.json               │
                    │  (5 original articles)       │
                    └──────────────────────────────┘
```

---

## Phase 2: AI Enhancement Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   UPDATE SCRIPT (updateArticles.js)                      │
└────────────────────────────────┬────────────────────────────────────────┘
                                  │
                                  │ 1. Fetch articles from API
                                  ▼
                    ┌──────────────────────────────┐
                    │  GET /api/articles           │
                    │  Filter: isUpdated = false   │
                    └──────────────┬───────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │  For each article:         │
                    └─────────────┬──────────────┘
                                  │
                                  │ 2. Search on Google
                                  ▼
                    ┌──────────────────────────────┐
                    │  Google Search               │
                    │  Query: "{title} blog"       │
                    └──────────────┬───────────────┘
                                  │
                                  │ 3. Extract top 2 results
                                  ▼
                    ┌──────────────────────────────┐
                    │  Filter blog/article links   │
                    │  Exclude: social media, etc  │
                    └──────────────┬───────────────┘
                                  │
                                  │ 4. Scrape reference articles
                                  ▼
                    ┌──────────────────────────────┐
                    │  Axios + Cheerio             │
                    │  Extract main content        │
                    │  Clean HTML                  │
                    └──────────────┬───────────────┘
                                  │
                                  │ 5. Send to OpenAI
                                  ▼
                    ┌──────────────────────────────┐
                    │  OpenAI GPT-3.5-turbo        │
                    │  Prompt:                     │
                    │  - Original content          │
                    │  - Reference articles        │
                    │  - Rewrite with style match  │
                    └──────────────┬───────────────┘
                                  │
                                  │ 6. Get enhanced content
                                  ▼
                    ┌──────────────────────────────┐
                    │  Append citations            │
                    │  [1] URL1                    │
                    │  [2] URL2                    │
                    └──────────────┬───────────────┘
                                  │
                                  │ 7. Update via API
                                  ▼
                    ┌──────────────────────────────┐
                    │  PUT /api/articles/:id       │
                    │  isUpdated: true             │
                    │  references: [URLs]          │
                    └──────────────────────────────┘
```

---

## Phase 3: Frontend Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         REACT APPLICATION                                │
└────────────────────────────────┬────────────────────────────────────────┘
                                  │
                                  │ Component Mount
                                  ▼
                    ┌──────────────────────────────┐
                    │  useEffect(() => {           │
                    │    fetchArticles();          │
                    │  }, []);                     │
                    └──────────────┬───────────────┘
                                  │
                                  │ axios.get()
                                  ▼
                    ┌──────────────────────────────┐
                    │  GET /api/articles           │
                    │  Backend API                 │
                    └──────────────┬───────────────┘
                                  │
                                  │ JSON Response
                                  ▼
                    ┌──────────────────────────────┐
                    │  setState(articles)          │
                    │  Store in React state        │
                    └──────────────┬───────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │  Filter articles:           │
                    │  - originalArticles         │
                    │  - updatedArticles          │
                    └─────────────┬──────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │  Apply user filters:        │
                    │  - showOriginal checkbox    │
                    │  - showUpdated checkbox     │
                    └─────────────┬──────────────┘
                                  │
                                  │ Render
                                  ▼
                    ┌──────────────────────────────┐
                    │  ArticleCard components      │
                    │  - Title                     │
                    │  - Content preview           │
                    │  - Read more/less            │
                    │  - References (if updated)   │
                    │  - Source link               │
                    └──────────────────────────────┘
```

---

## Complete Data Flow (End-to-End)

```
START
  │
  ├─► [PHASE 1] npm run scrape
  │     │
  │     ├─► Puppeteer launches Chrome
  │     ├─► Navigate to beyondchats.com/blogs
  │     ├─► Find last page
  │     ├─► Scrape 5 oldest articles
  │     ├─► Extract full content
  │     └─► Save to articles.json
  │           │
  │           ├─► Article 1 { id, title, content, url, isUpdated: false }
  │           ├─► Article 2 { ... }
  │           ├─► Article 3 { ... }
  │           ├─► Article 4 { ... }
  │           └─► Article 5 { ... }
  │
  ├─► [PHASE 2] npm run update-articles (Optional)
  │     │
  │     ├─► For each article:
  │     │     │
  │     │     ├─► Search Google for "{title} blog"
  │     │     ├─► Get top 2 blog URLs
  │     │     ├─► Scrape content from both URLs
  │     │     ├─► Send to OpenAI API:
  │     │     │     - Original content
  │     │     │     - Reference 1 content
  │     │     │     - Reference 2 content
  │     │     │     - Prompt: Rewrite matching top article style
  │     │     ├─► Receive enhanced content
  │     │     ├─► Append citations
  │     │     └─► Update article in database:
  │     │           isUpdated: true
  │     │           references: [URL1, URL2]
  │     │
  │     └─► All articles now enhanced
  │
  ├─► [BACKEND] npm start
  │     │
  │     ├─► Express server starts on port 5000
  │     ├─► CORS enabled
  │     ├─► Routes registered:
  │     │     GET    /api/articles
  │     │     GET    /api/articles/:id
  │     │     POST   /api/articles
  │     │     PUT    /api/articles/:id
  │     │     DELETE /api/articles/:id
  │     └─► Ready to serve requests
  │
  └─► [FRONTEND] npm start
        │
        ├─► React dev server starts on port 3000
        ├─► Component mounts
        ├─► useEffect triggers
        ├─► Fetch articles from backend
        ├─► Store in state
        ├─► Filter by isUpdated flag
        ├─► Apply user filter selections
        ├─► Render ArticleCard for each article
        └─► User can:
              ├─► Toggle filters
              ├─► Read more/less
              ├─► View references
              └─► Click source links
END
```

---

## Technology Stack Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND STACK                                 │
├─────────────────────────────────────────────────────────────────────────┤
│  React 18          │  JavaScript library for UI                         │
│  CSS3              │  Styling and responsive design                     │
│  Axios             │  HTTP client for API calls                         │
│  Create React App  │  Build tooling and dev server                      │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                           BACKEND STACK                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  Node.js           │  JavaScript runtime                                │
│  Express.js        │  Web framework                                     │
│  Puppeteer         │  Headless Chrome for scraping                      │
│  Cheerio           │  HTML parsing                                      │
│  Axios             │  HTTP client                                       │
│  dotenv            │  Environment variables                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────────────┤
│  BeyondChats       │  Source website for articles                       │
│  Google Search     │  Finding top-ranking articles                      │
│  OpenAI API        │  GPT-3.5-turbo for content rewriting               │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                            DATA STORAGE                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  JSON File         │  Simple file-based database                        │
│  articles.json     │  Stores all article data                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              PRODUCTION                                  │
└─────────────────────────────────────────────────────────────────────────┘

USER BROWSER
     │
     │ HTTPS
     ▼
┌──────────────────────┐
│  Vercel / Netlify    │  ◄── React App (Static Files)
│  CDN                 │      - index.html
│  (Frontend)          │      - bundle.js
└──────────┬───────────┘      - styles.css
           │
           │ API Calls (HTTPS)
           │
           ▼
┌──────────────────────┐
│  Render / Railway    │  ◄── Node.js Server
│  (Backend)           │      - Express API
└──────────┬───────────┘      - CRUD operations
           │                   - Scraper scripts
           │
           ▼
┌──────────────────────┐
│  File Storage        │  ◄── articles.json
│  (Server Disk)       │      - Persistent data
└──────────────────────┘

EXTERNAL SERVICES:
- OpenAI API (GPT-3.5)
- Google Search
- BeyondChats Website
```

---

## Request/Response Cycle

```
1. USER REQUESTS ARTICLES
   │
   ├─► Browser: GET http://localhost:3000
   ├─► React loads
   ├─► useEffect triggers
   └─► Axios: GET http://localhost:5000/api/articles

2. BACKEND PROCESSES REQUEST
   │
   ├─► Express receives request
   ├─► Route: GET /api/articles
   ├─► Controller: articlesRoutes
   ├─► db.getAllArticles()
   ├─► fs.readFileSync('articles.json')
   └─► Parse JSON

3. BACKEND SENDS RESPONSE
   │
   ├─► res.json(articles)
   └─► Send Array of article objects

4. FRONTEND RECEIVES & RENDERS
   │
   ├─► Response: [{ id, title, content, ... }]
   ├─► setState(articles)
   ├─► Re-render components
   ├─► Map through articles
   └─► Render ArticleCard for each
```

---

## Security Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SECURITY MEASURES                               │
└─────────────────────────────────────────────────────────────────────────┘

CORS (Cross-Origin Resource Sharing)
  │
  ├─► Configured in Express
  ├─► Allows frontend domain
  └─► Blocks unauthorized origins

ENVIRONMENT VARIABLES
  │
  ├─► .env file for secrets
  ├─► Never committed to Git
  ├─► OPENAI_API_KEY protected
  └─► .gitignore configured

INPUT VALIDATION
  │
  ├─► Type checking in APIs
  ├─► ID validation
  └─► Error handling for invalid data

HTTPS (Production)
  │
  ├─► Vercel: Auto HTTPS
  ├─► Render: Auto HTTPS
  └─► SSL certificates managed
```

---

## Error Handling Flow

```
ERROR OCCURS
  │
  ├─► Backend Error
  │     │
  │     ├─► Try/Catch blocks
  │     ├─► Log error
  │     ├─► Send 500 status
  │     └─► JSON error message
  │
  ├─► Frontend Error
  │     │
  │     ├─► Catch in axios
  │     ├─► Update error state
  │     ├─► Display error message
  │     └─► Keep UI functional
  │
  └─► User sees clear error message
        "Failed to load articles. Make sure backend is running."
```

---

This architecture ensures:
- ✅ Separation of concerns
- ✅ Scalable structure
- ✅ Easy maintenance
- ✅ Clear data flow
- ✅ Robust error handling
- ✅ Production-ready deployment
