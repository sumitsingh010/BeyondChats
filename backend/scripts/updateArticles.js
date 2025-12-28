const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');

async function searchGoogle(query) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    const links = await page.evaluate(() => {
      const results = [];
      const elements = document.querySelectorAll('a');
      
      elements.forEach(el => {
        const href = el.href;
        if (href && href.startsWith('http') && !href.includes('google.com')) {
          const parent = el.closest('div[data-sokoban-container]') || el.closest('.g');
          if (parent) {
            results.push(href);
          }
        }
      });
      
      return [...new Set(results)];
    });

    await browser.close();
    
    const filteredLinks = links.filter(link => {
      const excludeDomains = ['youtube.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com'];
      return !excludeDomains.some(domain => link.includes(domain));
    });

    return filteredLinks.slice(0, 2);

  } catch (error) {
    console.error('Error searching Google:', error);
    await browser.close();
    return [];
  }
}

async function scrapeArticleContent(url) {
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    $('script, style, nav, header, footer, iframe, noscript').remove();

    const contentSelectors = [
      'article',
      '.post-content',
      '.entry-content',
      '.content',
      'main',
      '.article-content'
    ];

    let content = '';
    for (let selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text();
        break;
      }
    }

    if (!content) {
      content = $('body').text();
    }

    content = content.replace(/\s+/g, ' ').trim();
    
    return content.substring(0, 3000);

  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return '';
  }
}

async function updateArticleWithLLM(originalArticle, referenceArticles) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('OpenAI API key not configured, skipping LLM update');
    return {
      content: originalArticle.content,
      references: referenceArticles
    };
  }

  try {
    const prompt = `You are a content writer. Rewrite the following article to match the style and formatting of top-ranking articles.

Original Article:
Title: ${originalArticle.title}
Content: ${originalArticle.content}

Reference Articles for Style:
${referenceArticles.map((ref, i) => `Reference ${i + 1}:\nURL: ${ref.url}\nContent: ${ref.content.substring(0, 1000)}`).join('\n\n')}

Instructions:
1. Keep the core message and information from the original article
2. Improve readability and structure
3. Match the professional tone of top-ranking articles
4. Make it engaging and informative
5. Keep it concise but comprehensive

Provide only the rewritten article content without any meta-commentary.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a professional content writer.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const updatedContent = response.data.choices[0].message.content;

    return {
      content: updatedContent,
      references: referenceArticles
    };

  } catch (error) {
    console.error('Error calling LLM API:', error.message);
    return {
      content: originalArticle.content,
      references: referenceArticles
    };
  }
}

async function processArticle(articleId) {
  try {
    const response = await axios.get(`http://localhost:5000/api/articles/${articleId}`);
    const article = response.data;

    console.log(`\nProcessing: ${article.title}`);

    const searchQuery = article.title + ' blog article';
    console.log(`Searching Google for: ${searchQuery}`);
    
    const topLinks = await searchGoogle(searchQuery);
    console.log(`Found ${topLinks.length} top links`);

    const referenceArticles = [];
    for (let link of topLinks) {
      console.log(`Scraping: ${link}`);
      const content = await scrapeArticleContent(link);
      if (content) {
        referenceArticles.push({ url: link, content });
      }
    }

    console.log(`Scraped ${referenceArticles.length} reference articles`);

    const { content: updatedContent, references } = await updateArticleWithLLM(
      article,
      referenceArticles
    );

    const referenceCitations = references.map((ref, i) => `[${i + 1}] ${ref.url}`).join('\n');
    const finalContent = `${updatedContent}\n\n---\n\nReferences:\n${referenceCitations}`;

    await axios.put(`http://localhost:5000/api/articles/${articleId}`, {
      content: finalContent,
      isUpdated: true,
      references: references.map(r => r.url),
      updatedAt: new Date().toISOString()
    });

    console.log(`Successfully updated article: ${article.title}`);

  } catch (error) {
    console.error(`Error processing article ${articleId}:`, error.message);
  }
}

async function updateAllArticles() {
  try {
    const response = await axios.get('http://localhost:5000/api/articles');
    const articles = response.data;

    console.log(`Found ${articles.length} articles to process`);

    for (let article of articles) {
      if (!article.isUpdated) {
        await processArticle(article.id);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    console.log('\nAll articles processed successfully');

  } catch (error) {
    console.error('Error updating articles:', error.message);
  }
}

if (require.main === module) {
  updateAllArticles()
    .then(() => console.log('Update process completed'))
    .catch(err => console.error('Update process failed:', err));
}

module.exports = { updateAllArticles, processArticle };
