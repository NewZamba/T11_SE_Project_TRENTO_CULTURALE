var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


/* POST login user  */
router.post('/', async function (req, res, next) {
    const {email, password} = req.body;
    try {
        // Cerca l'utente nel database
        const user = await User.findOne({email_user: email});

        // Controlla se l'utente esiste
        if (!user) {
            return res.status(404).json({message: "Utente non trovato"});
        }

        // Controlla se la password è corretta
        const isPasswordCorrect = await bcrypt.compare(password, user.pass_user);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password errata"});
        }

        // Set user session
        req.session.user = {
            id: user._id,
            email: user.email_user
        };

        // Se email e password sono corrette
        res.body = JSON.stringify(user);
        return res.status(200).json({message: "Login riuscito", user});

    } catch (error) {
        console.error("Errore durante il login:", error);
        return res.status(500).json({message: "Errore del server"});
    }
});

module.exports = router;