const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'articles.json');

function readArticles() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeArticles(articles) {
  fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2));
}

function getAllArticles() {
  return readArticles();
}

function getArticleById(id) {
  const articles = readArticles();
  return articles.find(article => article.id === parseInt(id));
}

function createArticle(articleData) {
  const articles = readArticles();
  const newArticle = {
    id: Date.now(),
    ...articleData,
    createdAt: new Date().toISOString()
  };
  articles.push(newArticle);
  writeArticles(articles);
  return newArticle;
}

function updateArticle(id, updates) {
  const articles = readArticles();
  const index = articles.findIndex(article => article.id === parseInt(id));
  
  if (index === -1) {
    return null;
  }

  articles[index] = {
    ...articles[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  writeArticles(articles);
  return articles[index];
}

function deleteArticle(id) {
  const articles = readArticles();
  const filteredArticles = articles.filter(article => article.id !== parseInt(id));
  
  if (articles.length === filteredArticles.length) {
    return false;
  }
  
  writeArticles(filteredArticles);
  return true;
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
