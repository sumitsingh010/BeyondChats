const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeLastPageArticles() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://beyondchats.com/blogs/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    const lastPageNumber = await page.evaluate(() => {
      const pageButtons = Array.from(document.querySelectorAll('.page-numbers'));
      const numbers = pageButtons
        .map(btn => parseInt(btn.textContent))
        .filter(num => !isNaN(num));
      return Math.max(...numbers);
    });

    console.log(`Last page number: ${lastPageNumber}`);

    // Scrape from multiple pages (last 3 pages)
    let allArticles = [];
    const pagesToScrape = Math.max(1, lastPageNumber - 2); // Start from 3 pages back
    
    for (let pageNum = pagesToScrape; pageNum <= lastPageNumber; pageNum++) {
      console.log(`Scraping page ${pageNum}...`);
      await page.goto(`https://beyondchats.com/blogs/page/${pageNum}/`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      await page.waitForSelector('article', { timeout: 10000 });

      const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll('article');
      const results = [];

      articleElements.forEach(article => {
        const titleElement = article.querySelector('h3 a, h2 a, .entry-title a');
        const linkElement = article.querySelector('a');
        const excerptElement = article.querySelector('.entry-summary, .entry-content, p');
        const imageElement = article.querySelector('img');
        const dateElement = article.querySelector('.entry-date, time, .published');

        if (titleElement && linkElement) {
          results.push({
            title: titleElement.textContent.trim(),
            url: linkElement.href,
            excerpt: excerptElement ? excerptElement.textContent.trim().substring(0, 200) : '',
            image: imageElement ? imageElement.src : '',
            date: dateElement ? dateElement.textContent.trim() : '',
            scrapedAt: new Date().toISOString()
          });
        }
      });

      return results.slice(0, 5);
    });

      allArticles = allArticles.concat(articles);
      console.log(`Scraped ${articles.length} articles from page ${pageNum}`);
    }

    console.log(`Total scraped ${allArticles.length} articles`);

    for (let article of allArticles) {
      try {
        await page.goto(article.url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const content = await page.evaluate(() => {
          const contentSelectors = [
            '.entry-content',
            'article .content',
            '.post-content',
            'article p'
          ];

          for (let selector of contentSelectors) {
            const element = document.querySelector(selector);
            if (element) {
              return element.textContent.trim();
            }
          }
          return '';
        });

        article.content = content.substring(0, 5000);
        console.log(`Scraped content for: ${article.title}`);
      } catch (err) {
        console.error(`Error scraping content for ${article.title}:`, err.message);
        article.content = article.excerpt;
      }
    }

    const articlesWithIds = allArticles.map((article, index) => ({
      id: Date.now() + index,
      ...article,
      isUpdated: false,
      originalContent: article.content,
      references: []
    }));

    const dataPath = path.join(__dirname, '..', 'data', 'articles.json');
    fs.writeFileSync(dataPath, JSON.stringify(articlesWithIds, null, 2));

    console.log('Articles saved to database');
    console.log('Scraped articles:', articlesWithIds.map(a => a.title));

    await browser.close();
    return articlesWithIds;

  } catch (error) {
    console.error('Error scraping articles:', error);
    await browser.close();
    throw error;
  }
}

if (require.main === module) {
  scrapeLastPageArticles()
    .then(() => console.log('Scraping completed successfully'))
    .catch(err => console.error('Scraping failed:', err));
}

module.exports = { scrapeLastPageArticles };
