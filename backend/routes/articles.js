const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', (req, res) => {
  try {
    const articles = db.getAllArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const article = db.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

router.post('/', (req, res) => {
  try {
    const newArticle = db.createArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updated = db.updateArticle(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteArticle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;
