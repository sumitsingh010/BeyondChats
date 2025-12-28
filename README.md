# BeyondChats Article Viewer

A full-stack web app for scraping and displaying articles from BeyondChats blog.

## Features

- Scrapes articles from BeyondChats blog
- Displays articles in horizontal scrolling layout
- Search functionality
- Full-screen reading mode
- Product, Pricing, FAQ, and Contact pages

## Tech Stack

**Backend:** Node.js, Express, Puppeteer  
**Frontend:** React, CSS

## Setup

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
└── frontend/
    ├── src/
    └── public/
```

## Contact

Email: sengarsumit7047@gmail.com

Made by Sumit Singh Sengar
- Complete CRUD API for article management
