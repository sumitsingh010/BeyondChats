# BeyondChats Article Viewer

A full-stack web application for scraping, managing, and displaying articles from the BeyondChats blog. This project provides a comprehensive solution for article management with a modern, responsive user interface.

## 🔗 Live Demo

**Frontend:** [Add your deployed frontend URL here]

*Note: Deploy your frontend on platforms like Vercel, Netlify, or GitHub Pages*

## ✨ Features

- 🌐 Automated web scraping from BeyondChats blog
- 📱 Responsive horizontal scrolling article layout
- 🔍 Real-time search functionality
- 📖 Full-screen reading mode
- 🔄 Article update management system
- 📄 Additional pages: Product, Pricing, FAQ, Contact
- 🎨 Modern, clean UI design

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- Puppeteer (Web Scraping)
- Cheerio (HTML Parsing)
- Axios (HTTP Client)

**Frontend:**
- React.js
- CSS3
- Axios (API Communication)

**Data Storage:**
- JSON file-based storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

## 🚀 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sumitsingh010/BeyondChats.git
cd BeyondChats
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```

The backend server will run on `http://localhost:5000`

**Available Backend Scripts:**
- `npm start` - Start the Express server
- `npm run dev` - Start server with nodemon (auto-restart on changes)
- `npm run scrape` - Run the web scraper to fetch articles
- `npm run update-articles` - Update existing articles

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory from project root
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend application will run on `http://localhost:3000`

**Available Frontend Scripts:**
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests

### 4. Initial Data Setup

To populate the database with articles from BeyondChats blog:

```bash
# From the backend directory
cd backend
npm run scrape
```

This will scrape articles and save them to `backend/data/articles.json`

## 📊 Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BEYONDCHATS APPLICATION                      │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   BeyondChats    │
│   Blog Website   │
│                  │
└────────┬─────────┘
         │
         │ 1. Scrape Articles
         │    (Puppeteer + Cheerio)
         │
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           BACKEND (Node.js + Express)                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  scripts/                                                      │  │
│  │  ├─ scraper.js        - Web scraping logic                   │  │
│  │  └─ updateArticles.js - Article update management            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                  │                                   │
│                                  ▼                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  data/articles.json    - JSON-based data storage             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                  │                                   │
│                                  ▼                                   │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  routes/articles.js    - RESTful API endpoints               │  │
│  │  ├─ GET    /api/articles       - Fetch all articles          │  │
│  │  ├─ GET    /api/articles/:id   - Fetch single article        │  │
│  │  ├─ POST   /api/articles       - Create article              │  │
│  │  ├─ PUT    /api/articles/:id   - Update article              │  │
│  │  └─ DELETE /api/articles/:id   - Delete article              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Port: 5000                                                          │
└───────────────────────────┬───────────────────────────────────────────┘
                            │
                            │ 2. API Requests (HTTP/REST)
                            │    - Fetch articles
                            │    - Search articles
                            │    - CRUD operations
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       FRONTEND (React.js)                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  src/                                                          │  │
│  │  ├─ App.js            - Main application component           │  │
│  │  ├─ index.js          - Application entry point              │  │
│  │  ├─ App.css           - Application styling                  │  │
│  │  └─ index.css         - Global styling                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  Features:                                                           │
│  • Horizontal scrolling article cards                                │
│  • Real-time search functionality                                    │
│  • Full-screen reading mode                                          │
│  • Responsive design                                                 │
│  • Navigation: Home, Product, Pricing, FAQ, Contact                 │
│                                                                       │
│  Port: 3000                                                          │
└───────────────────────────┬───────────────────────────────────────────┘
                            │
                            │ 3. User Interaction
                            │    - Browse articles
                            │    - Search articles
                            │    - Read full content
                            │
                            ▼
                      ┌──────────┐
                      │   USER   │
                      └──────────┘

DATA FLOW SEQUENCE:
1. Web Scraper → Fetches articles from BeyondChats blog
2. JSON Storage → Stores scraped article data
3. Express API → Provides RESTful endpoints for data access
4. React Frontend → Fetches and displays articles via API
5. User Interface → User interacts with articles
```

## 📁 Project Structure

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
