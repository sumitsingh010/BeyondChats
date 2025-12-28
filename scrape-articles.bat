@echo off
echo ========================================
echo Scraping BeyondChats Articles
echo ========================================
echo.
cd backend
npm run scrape
echo.
echo ========================================
echo Scraping Complete!
echo Check backend/data/articles.json
echo ========================================
echo.
pause
