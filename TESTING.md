# Testing Guide

Complete guide to test all features of the BeyondChats application.

## Prerequisites

Make sure both backend and frontend are running:

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm start
```

## Phase 1: Backend API Testing

### Test 1: Server Running

**Test**: Check if server is running
```bash
curl http://localhost:5000
```

**Expected Response**:
```json
{"message": "BeyondChats API Server Running"}
```

✅ Pass if JSON response received

---

### Test 2: Get All Articles

**Test**: Fetch all articles
```bash
curl http://localhost:5000/api/articles
```

**Expected Response**:
- JSON array (may be empty initially)
- Status 200

✅ Pass if valid JSON array

---

### Test 3: Create Article

**Test**: Create a new article
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Article\",\"content\":\"This is test content\",\"url\":\"https://test.com\"}"
```

**Expected Response**:
```json
{
  "id": 1234567890,
  "title": "Test Article",
  "content": "This is test content",
  "url": "https://test.com",
  "createdAt": "2025-12-28T..."
}
```

✅ Pass if article created with unique ID

---

### Test 4: Get Single Article

**Test**: Fetch article by ID (use ID from previous test)
```bash
curl http://localhost:5000/api/articles/1234567890
```

**Expected Response**:
- Article object with matching ID
- Status 200

✅ Pass if correct article returned

---

### Test 5: Update Article

**Test**: Update an existing article
```bash
curl -X PUT http://localhost:5000/api/articles/1234567890 \
  -H "Content-Type: application/json" \
  -d "{\"content\":\"Updated content\"}"
```

**Expected Response**:
- Updated article object
- Content changed
- `updatedAt` timestamp added

✅ Pass if article updated

---

### Test 6: Delete Article

**Test**: Delete an article
```bash
curl -X DELETE http://localhost:5000/api/articles/1234567890
```

**Expected Response**:
```json
{"message": "Article deleted successfully"}
```

**Verify**: Article no longer in GET /api/articles

✅ Pass if article deleted

---

## Phase 2: Web Scraping

### Test 7: Scrape BeyondChats Articles

**Test**: Run the scraper
```bash
cd backend
npm run scrape
```

**Expected Output**:
```
Last page number: X
Scraped 5 articles from last page
Scraped content for: [Article Title]
...
Articles saved to database
```

**Verify**:
1. Check `backend/data/articles.json` has 5 articles
2. Each article has: id, title, content, url, date, image
3. All articles have `isUpdated: false`

✅ Pass if 5 articles scraped and saved

---

### Test 8: Article Content Quality

**Test**: Check scraped data quality

Open `backend/data/articles.json` and verify:
- [ ] All titles are present and meaningful
- [ ] Content is not empty
- [ ] URLs are valid
- [ ] Dates are formatted
- [ ] No duplicate articles

✅ Pass if all data is complete

---

## Phase 3: Article Enhancement

### Test 9: Google Search Integration

**Test**: Run article updater
```bash
cd backend
npm run update-articles
```

**Expected Output**:
```
Found X articles to process
Processing: [Article Title]
Searching Google for: [Query]
Found 2 top links
Scraping: [URL 1]
Scraping: [URL 2]
Successfully updated article
```

**Note**: This requires OPENAI_API_KEY in .env

✅ Pass if articles processed without errors

---

### Test 10: AI-Updated Content

**Verify Updated Articles**:

Check `backend/data/articles.json`:
- [ ] Articles have `isUpdated: true`
- [ ] Content is different from original
- [ ] References array contains URLs
- [ ] Citations appended to content

Example:
```json
{
  "id": 123,
  "title": "Article",
  "content": "Updated content...\n\n---\n\nReferences:\n[1] https://...",
  "isUpdated": true,
  "references": ["https://...", "https://..."],
  "updatedAt": "2025-12-28T..."
}
```

✅ Pass if articles properly updated

---

## Phase 4: Frontend Testing

### Test 11: Frontend Loads

**Test**: Open http://localhost:3000

**Verify**:
- [ ] Page loads without errors
- [ ] Header displays "BeyondChats Articles"
- [ ] No console errors
- [ ] Loading state appears briefly

✅ Pass if page loads successfully

---

### Test 12: Articles Display

**Test**: Check article rendering

**Verify**:
- [ ] Articles appear in cards
- [ ] Article titles visible
- [ ] Content preview shown
- [ ] Images load (if available)
- [ ] Dates display

✅ Pass if articles render correctly

---

### Test 13: Filter Functionality

**Test**: Toggle filters

1. **Uncheck "Show Original"**:
   - Original articles disappear
   - Only updated articles visible

2. **Uncheck "Show Updated"**:
   - Updated articles disappear
   - Only original articles visible

3. **Uncheck Both**:
   - No articles visible

4. **Check Both**:
   - All articles visible

✅ Pass if filters work correctly

---

### Test 14: Read More/Less

**Test**: Expand article content

1. Click "Read More" button
2. Full content displays
3. Button changes to "Show Less"
4. Click "Show Less"
5. Content collapses

✅ Pass if expansion works

---

### Test 15: External Links

**Test**: Click "View Original Source"

**Verify**:
- Link opens in new tab
- Goes to correct article URL

✅ Pass if links work

---

### Test 16: References Display

**Test**: Check updated article references

**Verify**:
- References section appears
- Contains 2 URLs
- Links are clickable
- Open in new tab

✅ Pass if references display

---

## Responsive Design Testing

### Test 17: Mobile View

**Test**: Resize browser to 375px width

**Verify**:
- [ ] Layout adjusts to single column
- [ ] Header responsive
- [ ] Cards stack vertically
- [ ] Text readable
- [ ] Buttons accessible
- [ ] No horizontal scroll

✅ Pass if mobile-friendly

---

### Test 18: Tablet View

**Test**: Resize browser to 768px width

**Verify**:
- [ ] Cards in 1-2 columns
- [ ] Spacing appropriate
- [ ] All features accessible

✅ Pass if tablet-friendly

---

### Test 19: Desktop View

**Test**: Full screen (1920px)

**Verify**:
- [ ] Cards in multiple columns
- [ ] Content centered
- [ ] No excessive white space
- [ ] Readable typography

✅ Pass if desktop-optimized

---

## Error Handling Testing

### Test 20: Backend Down

**Test**: Stop backend server

**Verify Frontend**:
- Error message displays
- "Failed to load articles. Make sure the backend server is running."
- No crashes

✅ Pass if error handled gracefully

---

### Test 21: No Data

**Test**: Empty articles.json

1. Clear `backend/data/articles.json` to `[]`
2. Refresh frontend

**Verify**:
- Empty state displays
- Instructions to run scraper
- No errors in console

✅ Pass if empty state shown

---

### Test 22: Invalid API Response

**Test**: Modify API to return invalid data

**Verify**:
- Frontend handles gracefully
- Shows error or empty state
- No crashes

✅ Pass if errors handled

---

## Performance Testing

### Test 23: Load Time

**Test**: Measure load performance

Use browser DevTools:
- [ ] Frontend loads < 3 seconds
- [ ] API response < 1 second
- [ ] Images lazy load
- [ ] No memory leaks

✅ Pass if performant

---

### Test 24: Multiple Articles

**Test**: Load many articles (20+)

**Verify**:
- [ ] Smooth scrolling
- [ ] No lag when filtering
- [ ] Read more/less responsive
- [ ] Memory usage acceptable

✅ Pass if handles scale

---

## Integration Testing

### Test 25: Complete Workflow

**Test**: Full end-to-end flow

1. Start backend
2. Run scraper
3. Verify articles in database
4. Start frontend
5. View original articles
6. Run update script
7. Refresh frontend
8. View updated articles
9. Toggle filters
10. Expand articles

✅ Pass if entire flow works

---

## Cross-Browser Testing

### Test 26: Browser Compatibility

**Test in Multiple Browsers**:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Verify**:
- All features work
- Styling consistent
- No console errors

✅ Pass if works in all browsers

---

## Security Testing

### Test 27: CORS Configuration

**Test**: Access API from different origin

**Verify**:
- CORS headers present
- Requests allowed from frontend origin

✅ Pass if CORS configured

---

### Test 28: Input Validation

**Test**: Send invalid data to APIs

```bash
# Empty title
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -d "{}"

# Invalid ID
curl http://localhost:5000/api/articles/invalid
```

**Verify**:
- Server doesn't crash
- Appropriate error responses

✅ Pass if validated

---

## Documentation Testing

### Test 29: README Accuracy

**Verify**:
- [ ] Setup instructions work
- [ ] All commands execute
- [ ] Links are valid
- [ ] Architecture diagram clear

✅ Pass if documentation complete

---

### Test 30: Code Comments

**Review Code**:
- [ ] Complex logic commented
- [ ] Function purposes clear
- [ ] No misleading comments

✅ Pass if well-documented

---

## Test Results Summary

Fill out this checklist:

### Phase 1: Backend (6/6 tests)
- [ ] Server running
- [ ] Get all articles
- [ ] Create article
- [ ] Get single article
- [ ] Update article
- [ ] Delete article

### Phase 2: Scraping (4/4 tests)
- [ ] Scrape articles
- [ ] Content quality
- [ ] Google search
- [ ] AI updates

### Phase 3: Frontend (10/10 tests)
- [ ] Page loads
- [ ] Articles display
- [ ] Filters work
- [ ] Read more/less
- [ ] External links
- [ ] References display
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Error handling

### Additional (10/10 tests)
- [ ] No data state
- [ ] Invalid responses
- [ ] Load time
- [ ] Multiple articles
- [ ] Complete workflow
- [ ] Browser compatibility
- [ ] CORS configuration
- [ ] Input validation
- [ ] Documentation
- [ ] Code quality

**Total: ___/30 Tests Passed**

## Common Issues & Solutions

### Issue: Puppeteer fails
**Solution**: Install with `--ignore-scripts` or use axios/cheerio only

### Issue: API not accessible
**Solution**: Check CORS, verify server running, check firewall

### Issue: Frontend blank page
**Solution**: Check console errors, verify API_URL, check build

### Issue: No articles display
**Solution**: Run scraper first, check network tab, verify data format

### Issue: Filters don't work
**Solution**: Check state management, verify filter logic

## Automated Testing (Optional)

### Backend Tests

Create `backend/test/api.test.js`:
```javascript
const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  test('GET /api/articles', async () => {
    const res = await request(app).get('/api/articles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

### Frontend Tests

Create `frontend/src/App.test.js`:
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/BeyondChats Articles/i);
  expect(header).toBeInTheDocument();
});
```

Run tests:
```bash
npm test
```

## Final Checklist

Before submission:
- [ ] All 30 tests pass
- [ ] No console errors
- [ ] Code is clean
- [ ] Documentation complete
- [ ] Git commits made
- [ ] README updated
- [ ] Live demo works
- [ ] Mobile responsive
- [ ] Error handling present
- [ ] Performance acceptable

## Success!

If all tests pass, your application is ready for submission! 🎉

Remember to include test results in your README or submission notes.
