# BeyondChats Article Viewer

Full-stack application for scraping and displaying articles from BeyondChats blog.

## Live Demo

Frontend: [Will be added after deployment]

## Features

- Web scraping from BeyondChats blog using Puppeteer
- Horizontal scrolling article cards
- Search functionality
- Full-screen reading mode
- Article management (CRUD operations)
- Additional pages: Product, Pricing, FAQ, Contact

## Tech Stack

Backend:
- Node.js with Express
- Puppeteer for web scraping
- Cheerio for HTML parsing
- JSON file storage

Frontend:
- React
- CSS3
- Axios

## Prerequisites

- Node.js (v14+)
- npm
- Git

## Setup

### Clone the repo

```bash
git clone https://github.com/sumitsingh010/BeyondChats.git
cd BeyondChats
```

### Backend

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

Other commands:
- `npm run dev` - Run with nodemon
- `npm run scrape` - Scrape articles from BeyondChats
- `npm run update-articles` - Update existing articles

### Frontend

In a new terminal:

```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`

### Get Initial Data

Run the scraper to populate articles:

```bash
cd backend
npm run scrape
```

This scrapes the BeyondChats blog and saves articles to `backend/data/articles.json`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BEYONDCHATS APP                         │
└─────────────────────────────────────────────────────────────┘

   BeyondChats Blog
         │
         │ (Puppeteer scrapes)
         ▼
┌───────────────────────────────────────────────────────────┐
│  BACKEND (Express on :5000)                                │
│                                                             │
│  scripts/scraper.js ──┐                                   │
│                        ├──► data/articles.json             │
│  scripts/updateArticles.js ─┘                              │
│                                                             │
│  routes/articles.js                                        │
│  • GET    /api/articles       - All articles               │
│  • GET    /api/articles/:id   - Single article             │
│  • POST   /api/articles       - Create                     │
│  • PUT    /api/articles/:id   - Update                     │
│  • DELETE /api/articles/:id   - Delete                     │
└────────────────────┬──────────────────────────────────────┘
                     │
                     │ (REST API)
                     ▼
┌───────────────────────────────────────────────────────────┐
│  FRONTEND (React on :3000)                                 │
│                                                             │
│  • Horizontal scrolling cards                              │
│  • Search filter                                           │
│  • Full-screen reader                                      │
│  • Navigation pages                                        │
└────────────────────┬──────────────────────────────────────┘
                     │
                     ▼
                   User
```

How it works:
1. Puppeteer scrapes BeyondChats blog
2. Data stored in JSON file
3. Express API serves the data
4. React frontend fetches and displays
5. Users can browse, search, and read articles

## Project Structure

```
BeyondChats/
├── backend/
│   ├── server.js           # Express server
│   ├── package.json
│   ├── data/
│   │   └── articles.json   # Scraped articles
│   ├── models/
│   │   └── db.js          # DB helpers
│   ├── routes/
│   │   └── articles.js    # API routes
│   └── scripts/
│       ├── scraper.js     # Web scraper
│       └── updateArticles.js
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js         # Main component
│       ├── App.css
│       ├── index.js
│       └── index.css
│
├── README.md
└── LICENSE
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get article by ID |
| POST | `/api/articles` | Create article |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |

## Deployment

For deploying this project:

**Frontend:** Vercel or Netlify work well with React
- Build the frontend with `npm run build`
- Deploy the build folder

**Backend:** Render, Railway, or Heroku
- Point to the backend folder
- Set start command to `npm start`

After deployment, update the API URL in your React app to point to the deployed backend.

## Contact

Sumit Singh Sengar  
Email: sengarsumit7047@gmail.com  
GitHub: [@sumitsingh010](https://github.com/sumitsingh010)

## License

ISC License - see LICENSE file for details.
