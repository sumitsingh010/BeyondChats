# BeyondChats Article Viewer

Full-stack application for scraping and displaying articles from BeyondChats blog.

## Live Demo

Frontend: https://frontend-five-mu-34.vercel.app

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
├── backend/                 # Backend server
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   ├── data/
│   │   └── articles.json   # Article data storage
│   ├── models/
│   │   └── db.js          # Database helper functions
│   ├── routes/
│   │   └── articles.js    # Article API routes
│   └── scripts/
│       ├── scraper.js     # Web scraping script
│       └── updateArticles.js  # Article update script
│
├── frontend/               # React frontend
│   ├── package.json       # Frontend dependencies
│   ├── public/
│   │   └── index.html     # HTML template
│   └── src/
│       ├── App.js         # Main React component
│       ├── App.css        # App styles
│       ├── index.js       # React entry point
│       └── index.css      # Global styles
│
├── README.md              # Project documentation
└── LICENSE               # License file
```

## 🔄 How It Works

### Article Scraping Process
1. **Puppeteer** launches a headless browser
2. Navigates to BeyondChats blog
3. **Cheerio** parses the HTML content
4. Extracts article data (title, content, author, date, URL)
5. Saves structured data to `articles.json`

### Frontend-Backend Communication
1. React app makes HTTP requests to Express API
2. Express server reads/writes to JSON file
3. Data is sent back to frontend as JSON
4. React renders the articles in a responsive UI

### Article Display
- Articles are displayed in horizontal scrolling cards
- Search filters articles in real-time
- Click on an article for full-screen reading mode
- View original article via provided link

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get specific article by ID |
| POST | `/api/articles` | Create new article |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

**For Vercel:**
```bash
cd frontend
npm run build
# Install Vercel CLI: npm i -g vercel
vercel --prod
```

**For Netlify:**
```bash
cd frontend
npm run build
# Drag and drop the 'build' folder to Netlify dashboard
```

### Backend Deployment (Render/Railway/Heroku)

Update the frontend API URL in your React app to point to your deployed backend URL.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

**Developer:** Sumit Singh Sengar  
**Email:** sengarsumit7047@gmail.com  
**GitHub:** [@sumitsingh010](https://github.com/sumitsingh010)

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

**Note:** Remember to add your deployed frontend URL in the "Live Demo" section after deployment.
