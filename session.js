// session.js
const express = require('express');
const router = express.Router();

// Middleware de vérification de la session et du cookie "remember"
router.get('/session', (req, res) => {
  if (req.cookies.remember) {
    res.redirect('/index');
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
