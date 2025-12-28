# Frequently Asked Questions (FAQ)

Common questions and answers about the BeyondChats Full Stack Assignment.

---

## General Questions

### Q: What is this project?
**A:** A complete full-stack web application that scrapes articles from BeyondChats blogs, enhances them using AI (OpenAI GPT), and displays them in a modern React interface with CRUD APIs.

### Q: What technologies are used?
**A:** 
- Backend: Node.js, Express.js, Puppeteer, Cheerio, Axios
- Frontend: React, CSS3, Axios
- External: OpenAI API, Google Search
- Storage: JSON file database

### Q: Do I need prior experience with these technologies?
**A:** Basic knowledge of JavaScript, Node.js, and React is helpful. The code is clean and well-documented for easy understanding.

---

## Setup & Installation

### Q: How long does setup take?
**A:** About 5-10 minutes for complete installation including dependencies.

### Q: What are the prerequisites?
**A:**
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Internet connection
- OpenAI API key (optional, for AI enhancement)

### Q: How do I install Node.js?
**A:** Download from https://nodejs.org/ - Choose the LTS (Long Term Support) version.

### Q: Do I need to install a database?
**A:** No! The project uses a simple JSON file for storage. No database setup required.

### Q: The npm install is taking forever. Is this normal?
**A:** Yes, first-time installation can take 5-10 minutes depending on internet speed. Be patient.

### Q: I get permission errors during npm install. What do I do?
**A:** 
- Windows: Run terminal as Administrator
- Mac/Linux: Use `sudo npm install` (not recommended) or fix npm permissions
- Alternative: Use nvm (Node Version Manager)

---

## Backend Questions

### Q: What port does the backend use?
**A:** Port 5000 by default. You can change it in `backend/.env` file.

### Q: Port 5000 is already in use. What do I do?
**A:** 
1. Change port in `backend/.env`: `PORT=5001`
2. Update frontend API URL to match
3. Or stop the other application using port 5000

### Q: How do I stop the backend server?
**A:** Press `Ctrl+C` in the terminal where it's running.

### Q: Where are articles stored?
**A:** In `backend/data/articles.json` as a JSON array.

### Q: Can I use MongoDB instead of JSON?
**A:** Yes! You can replace the `db.js` file with MongoDB operations. The structure supports easy migration.

### Q: The scraper isn't working. Why?
**A:**
- Check your internet connection
- BeyondChats website structure may have changed
- Puppeteer might need additional setup on some systems
- Try running again (might be temporary)

### Q: Puppeteer installation failed. Help!
**A:**
```bash
# Try installing with ignore-scripts
npm install puppeteer --ignore-scripts

# Or use puppeteer-core
npm install puppeteer-core
```

---

## Scraping Questions

### Q: How does the scraper work?
**A:** It uses Puppeteer (headless Chrome) to:
1. Navigate to BeyondChats blogs
2. Find the last page
3. Extract 5 oldest articles
4. Visit each article page
5. Scrape full content
6. Save to JSON

### Q: Why scrape the LAST page?
**A:** The assignment requires the "5 oldest articles", which are on the last page (earlier posts).

### Q: Can I scrape more than 5 articles?
**A:** Yes! Modify `scraper.js` line:
```javascript
return results.slice(0, 5); // Change 5 to desired number
```

### Q: How often should I run the scraper?
**A:** Run once to get initial articles. Re-run anytime to fetch latest data from the last page.

### Q: The scraper got different articles than expected. Why?
**A:** Website content changes over time. Articles on the last page might be different.

### Q: Can I scrape from a different website?
**A:** Yes! Modify the URL and selectors in `scraper.js` to match the new website's structure.

---

## AI Enhancement Questions

### Q: Do I need an OpenAI API key?
**A:** It's optional but recommended for Phase 2 (AI enhancement). The app works without it, but won't rewrite articles.

### Q: How do I get an OpenAI API key?
**A:**
1. Go to https://platform.openai.com/
2. Create an account
3. Navigate to API Keys
4. Create new secret key
5. Copy and paste into `backend/.env`

### Q: Is the OpenAI API free?
**A:** You get free credits initially (~$5). After that, it's pay-per-use. This project uses minimal credits.

### Q: How much does each article update cost?
**A:** Using GPT-3.5-turbo, approximately $0.002-0.01 per article (very cheap).

### Q: What if I don't have an OpenAI key?
**A:** The app still works! You'll see original articles. Phase 2 script will skip AI rewriting.

### Q: Can I use a different AI model?
**A:** Yes! Modify `updateArticles.js` to use:
- GPT-4 (more expensive, better quality)
- Claude (Anthropic)
- Local models (Ollama)
- Any other API

### Q: The AI updates are taking too long. Is this normal?
**A:** Yes, each article takes 10-30 seconds:
- Google search: ~5 seconds
- Scraping 2 articles: ~5 seconds
- OpenAI API: ~5-20 seconds
- Plus 5-second delays between articles

---

## Frontend Questions

### Q: What port does the frontend use?
**A:** Port 3000 by default (Create React App standard).

### Q: The frontend won't connect to the backend. Why?
**A:**
- Check backend is running on port 5000
- Verify API_URL in `frontend/src/App.js`
- Check CORS is enabled in backend
- Check browser console for errors

### Q: How do I change the API URL?
**A:** Edit `frontend/src/App.js`:
```javascript
const API_URL = 'http://localhost:5000/api/articles';
```

### Q: Can I customize the UI?
**A:** Absolutely! Edit `frontend/src/App.css` to change:
- Colors
- Fonts
- Layout
- Spacing
- Responsive breakpoints

### Q: The articles aren't showing. What's wrong?
**A:**
1. Check backend is running
2. Check articles exist in `backend/data/articles.json`
3. Check browser console for errors
4. Check Network tab in DevTools
5. Verify API returns data: `curl http://localhost:5000/api/articles`

### Q: How do I make the UI look different?
**A:** Modify the CSS:
- Header gradient: `.header` class
- Card styles: `.article-card` class
- Colors: Change hex values
- Layout: Modify `.articles-grid`

---

## API Questions

### Q: What API endpoints are available?
**A:**
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get one article
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Q: How do I test the APIs?
**A:** Use:
- Browser: Visit `http://localhost:5000/api/articles`
- Command line: `curl http://localhost:5000/api/articles`
- Postman: Import the endpoints
- Thunder Client (VS Code extension)

### Q: Can I add authentication?
**A:** Yes! Add:
- JWT tokens
- Session management
- User registration/login
- Protected routes

### Q: How do I add more API endpoints?
**A:** Edit `backend/routes/articles.js`:
```javascript
router.get('/search', (req, res) => {
  // Your search logic
});
```

---

## Deployment Questions

### Q: Where can I deploy this for free?
**A:**
- Backend: Render, Railway, Heroku (free tiers)
- Frontend: Vercel, Netlify, GitHub Pages (free)

### Q: How long does deployment take?
**A:** About 10-15 minutes for both backend and frontend.

### Q: Do I need a credit card to deploy?
**A:** Most platforms offer free tiers without credit cards (Vercel, Netlify). Render may ask but won't charge.

### Q: Will my data persist after deployment?
**A:** On most platforms, yes. But for production, consider:
- MongoDB Atlas (free tier)
- PostgreSQL
- Cloud storage

### Q: How do I deploy to Vercel?
**A:**
1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Select `frontend` folder
5. Deploy (automatic)

### Q: How do I deploy to Render?
**A:**
1. Push code to GitHub
2. Go to render.com
3. New Web Service
4. Select `backend` folder
5. Set build/start commands
6. Deploy

### Q: The deployed app doesn't work. Help!
**A:** Common issues:
- Update API_URL in frontend to production backend URL
- Check environment variables are set
- Check logs for errors
- Verify CORS settings
- Ensure both services are deployed

---

## Troubleshooting

### Q: I get "Module not found" errors
**A:** Run `npm install` in the directory with the error.

### Q: "Cannot find module 'express'"
**A:** Install dependencies:
```bash
cd backend
npm install
```

### Q: Browser shows blank page
**A:**
- Check browser console for errors
- Verify backend is running
- Check `npm start` in frontend ran successfully
- Clear browser cache

### Q: "CORS policy" error in browser
**A:** Backend needs CORS enabled. It should be enabled in `server.js`:
```javascript
app.use(cors());
```

### Q: Changes aren't reflecting
**A:**
- Frontend: Auto-reloads with Create React App
- Backend: Restart server manually or use nodemon
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Q: Git is showing thousands of files to commit
**A:** You forgot `.gitignore`. Don't commit `node_modules/`:
```bash
# Remove from git
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

---

## Performance Questions

### Q: The app is slow. Why?
**A:**
- First load includes data fetching
- Large articles take time to render
- Puppeteer is resource-intensive
- AI API calls take 10-30 seconds

### Q: How can I make it faster?
**A:**
- Add loading spinners (already included)
- Implement pagination
- Cache API responses
- Lazy load images
- Optimize bundle size

### Q: Can this handle 100+ articles?
**A:** Yes, but consider:
- Pagination for better UX
- Virtual scrolling
- Database instead of JSON
- Search/filter functionality

---

## Code Questions

### Q: Can I modify the code?
**A:** Absolutely! It's designed to be:
- Simple to understand
- Easy to modify
- Well-structured
- Extensible

### Q: How do I add a new feature?
**A:**
1. Identify what you need (e.g., search)
2. Backend: Add route and logic
3. Frontend: Add UI and API call
4. Test thoroughly
5. Document changes

### Q: Is the code production-ready?
**A:** It's a good foundation. For production, add:
- Better error handling
- Input validation
- Rate limiting
- Monitoring
- Logging
- Security headers
- Database migration
- Automated tests

### Q: Can I use TypeScript instead?
**A:** Yes! Convert:
1. Rename `.js` to `.ts`
2. Add type definitions
3. Update `tsconfig.json`
4. Install types: `@types/node`, `@types/express`, etc.

---

## Assignment Questions

### Q: What should I submit?
**A:**
- Public GitHub repository
- README with setup instructions
- Live demo links (optional but recommended)
- Frequent commits showing progress

### Q: How many commits should I have?
**A:** 10-20+ commits showing development progress. See GIT_GUIDE.md.

### Q: What should the README include?
**A:**
- Project description
- Setup instructions
- Architecture diagram
- API documentation
- Live links
- Tech stack

### Q: Do I need to deploy it?
**A:** Recommended for extra points (10% of grade), but not required.

### Q: Can I add extra features?
**A:** Yes! Examples:
- Search functionality
- Article categories
- User comments
- Like/favorite system
- Export to PDF

### Q: How long should this take?
**A:**
- Following this guide: 2-4 hours
- Building from scratch: 10-20 hours
- Understanding thoroughly: 5-10 hours

---

## Common Errors

### Error: "EADDRINUSE: address already in use"
**Solution:** Port is taken. Change port in `.env` or stop other app.

### Error: "Cannot GET /"
**Solution:** Backend route missing. Add root route or check URL.

### Error: "Failed to fetch"
**Solution:** Backend not running or wrong URL. Start backend.

### Error: "npm: command not found"
**Solution:** Node.js not installed. Install from nodejs.org.

### Error: "Module not found: Error: Can't resolve"
**Solution:** Missing dependency. Run `npm install`.

### Error: "Puppeteer Chrome download failed"
**Solution:** 
```bash
npm install puppeteer --ignore-scripts
# Then manually download Chrome or use existing installation
```

---

## Best Practices

### Q: What are some best practices I should follow?
**A:**
1. **Git**: Commit frequently with clear messages
2. **Code**: Keep it simple and readable
3. **Comments**: Explain complex logic
4. **Errors**: Handle all error cases
5. **Testing**: Test thoroughly before submitting
6. **Documentation**: Update README with changes
7. **Security**: Never commit API keys
8. **UI**: Make it responsive and accessible

### Q: How do I write good commit messages?
**A:**
```
Good:
- feat: Add article search functionality
- fix: Resolve CORS issue in API
- docs: Update setup instructions

Bad:
- updated stuff
- fix
- changes
```

### Q: Should I use a linter?
**A:** Recommended! Add ESLint:
```bash
npm install --save-dev eslint
npx eslint --init
```

---

## Advanced Questions

### Q: Can I add user authentication?
**A:** Yes! Use:
- JWT tokens
- Passport.js
- Auth0
- Firebase Auth

### Q: Can I add a database?
**A:** Yes! Popular options:
- MongoDB (easy migration from JSON)
- PostgreSQL
- MySQL
- Firebase Firestore

### Q: Can I add real-time updates?
**A:** Yes! Use:
- WebSockets
- Socket.io
- Server-Sent Events

### Q: Can I add testing?
**A:** Yes! Use:
- Jest (unit tests)
- React Testing Library (frontend)
- Supertest (API tests)
- Puppeteer (E2E tests)

---

## Still Have Questions?

1. Check the documentation files:
   - README.md
   - SETUP.md
   - TESTING.md
   - DEPLOYMENT.md

2. Look at the code comments

3. Use the testing guide to verify setup

4. Check error messages carefully

5. Google specific error messages

6. Check Stack Overflow

---

## Quick Reference

### File Structure
```
pppppp/
├── backend/          # API server
├── frontend/         # React app
├── README.md         # Main docs
├── START_HERE.md     # Quick start
└── *.bat             # Windows scripts
```

### Quick Commands
```bash
# Setup
npm install

# Run
npm start

# Scrape
npm run scrape

# Update
npm run update-articles
```

### Important Files
- `backend/server.js` - API server
- `backend/scripts/scraper.js` - Web scraper
- `backend/routes/articles.js` - API routes
- `frontend/src/App.js` - Main React component
- `backend/data/articles.json` - Data storage

---

**Need more help? Check the extensive documentation or review the code comments!**
