// app.js²
const express = require('express');
const { join } = require('path');
const { config } = require('dotenv');
const bodyParser = require('body-parser');
config();

const app = express();

app.use(bodyParser.json());

// Middlewares
const cacheControl = (req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next(); };
app.use(require('cookie-parser')(), express.urlencoded({ extended: true }), express.json(), express.static(join(__dirname, 'public')));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// Regroupement des routes HTML
['/index', '/login', '/signup'].forEach(route => {
  if (route === '/login' || route === '/signup') {
    app.get(route, (req, res) => res.sendFile(join(__dirname, `./public/vue/${route.slice(1)}.html`)));
  } else {
    app.get(route, (req, res) => res.sendFile(join(__dirname, `./public/vue/${route.slice(1)}.html`)));
  }
});

// Regroupement des routes JS, Style, Image
const routeMappings = {
  'javascripts': ['/script', 'js'],
  'stylesheets': ['/style', 'css'],
  'images': ['/logo', 'png'],
};
for (const key in routeMappings) {
  const routes = routeMappings[key];
  routes.forEach(route => {
    if (routes[routes.length - 1] !== route) {
      app.get(route, (req, res) => res.sendFile(join(__dirname, `./public/${key}/${route.slice(1)}.${routes[routes.length - 1]}`)));
    }
  });
}

//connexion
app.use('/login', cacheControl, require('./post/connexion/login.js'));
app.use('/signup', cacheControl, require('./post/connexion/signup.js'));


// Route pour la déconnexion et la création de bouton
app.get('/', (req, res) => {
    res.redirect('/session');
});

// Configuration du port et démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express server listening on port ${port}`));

app.use(require('./session.js'));