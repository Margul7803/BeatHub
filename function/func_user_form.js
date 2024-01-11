// function/func_user_form.js
const path = require('path');
const { check, validationResult } = require('express-validator');

// Fonction pour valider l'adresse électronique
const validateEmail = (email) => {
  return check(email).isEmail().withMessage("L'adresse électronique n'est pas valide");
};

// Fonction pour valider le mot de passe
const validatePassword = (password) => {
  return check(password).not().isEmpty().withMessage('Le mot de passe est requis');
};

// Fonction pour valider les champs du formulaire
const validateForm = (req) => {
  return validationResult(req);
};

// Fonction pour valider le formulaire d'inscription
const validateSignupForm = (email, password, confirmPassword) => {
  const errors = [];

  // Vérifiez si l'adresse électronique contient un "@" pour une validation simple du format de l'adresse électronique
  if (!email.includes('@')) {
    errors.push("L'adresse électronique n'est pas valide");
  }

  // Vérifiez si les mots de passe saisis correspondent
  if (password !== confirmPassword) {
    errors.push("Les mots de passe ne correspondent pas");
  }

  // Vérifiez si les champs du formulaire ne sont pas vides
  if (!email || !password || !confirmPassword) {
    errors.push('Tous les champs doivent être remplis');
  }

  return errors;
};

module.exports = { validateEmail, validatePassword, validateForm, validateSignupForm };