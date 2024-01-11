const express = require('express');
const router = express.Router();
const func_form = require('../../function/func_user_form');
const { checkUserExists } = require('../../function/func_user_bdd');
const bcrypt = require('bcrypt');


router.post('/login_gestion', [
    func_form.validateEmail('email'),
    func_form.validatePassword('password'),
], async (req, res) => {
    const errors = func_form.validateForm(req);
    if (!errors.isEmpty()) {
        return res.redirect('/login?error=true');
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        user = checkUserExists(email)
        if (user && await bcrypt.compare(password, user.password)) {
            return res.redirect('/index')
        } else {
            return res.redirect('/login?error=true');
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/login?error=true');
    }
});

module.exports = router;
