// post/connexion/signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const func_user_bdd = require('../../function/func_user_bdd');
const func_user_form = require('../../function/func_user_form');

// Step 1: User fills out the registration form
router.post('/signup_gestion', [
    func_user_form.validateEmail('email'),
    func_user_form.validatePassword('password'),
], async (req, res) => {
    const errors = func_user_form.validateForm(req);
    if (!errors.isEmpty()) {
        return res.redirect('/signup?error=true');
    }
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    const pseudo = req.body.pseudo;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const tel = req.body.telephone;

    const userExists = await func_user_bdd.checkUserExists(email);
    if (userExists) {
        return res.redirect('/signup?error=true');
    }
    const validationErrors = func_user_form.validateSignupForm(email, password, confirmPassword);
    if (validationErrors.length > 0) {
        return res.redirect('/signup?error=true');
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash du mot de passe
        const userData = {
            email,
            password: hashedPassword,
            pseudo,
            nom,
            prenom,
            tel,
            roles: ["user"],
            isVerified: true,
            Artiste,
            artiste
        };
        const apiResponse = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/ld+json' },
            body: JSON.stringify(userData),
        });
        if (apiResponse.ok) {
            return res.redirect('/index');
        } else {
            return res.redirect('/signup?error=true');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/signup?error=true');
    }
});


module.exports = router;
