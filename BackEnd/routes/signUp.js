/**
 * @deprecated ora Auth.js sostituisce sia il login che la registrazione
 */


var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');


/* POST register user */
router.post('/', async function (req, res) {
    try {
        const { name_user, surname_user, email_user, pass_user, age_user, phone_user, type_user } = req.body;

        // Controlla se è una nuova email
        const existingUser = await User.findOne({email_user: email_user});
        if (existingUser) {
            return res.status(400).json({ message: "Utente gia' registrato" });
        }

        // Crypta la password
        const saltRounds = 10; // più sono meglio e'
        const hashedPassword = await bcrypt.hash(pass_user, saltRounds);

        // Crea un nuovo user
        const user = new User({
            name_user,
            surname_user,
            email_user,
            pass_user: hashedPassword,
            age_user,
            phone_user,
            type_user
        });

        // Salva l'User
        await user.save();

        return res.status(200).json({message: "Utente aggiunto con sucesso"});
    } catch(err) {
        console.error('Registration error:', err);
        return res.status(401).json({ message: "Utente non aggiunto: ", error: err.message });
    }
});

module.exports = router;