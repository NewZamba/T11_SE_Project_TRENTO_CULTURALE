var express = require('express');
var router = express.Router();
const User = require('../models/User');
const mongoose = require("mongoose");

/* POST login user  */
router.post('/', function(req, res, next)
{
    mongoose.connect('mongodb+srv://fraCok:fraCok@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log("Connessione al database riuscita");
            const {email, password} = req.body;
            try {
                // Cerca l'utente nel database
                const user = await User.findOne({email_user: email});

                // Controlla se l'utente esiste
                if (!user) {
                    return res.status(404).json({message: "Utente non trovato"});
                }

                // Controlla se la password è corretta
                if (user.pass_user !== password) {
                    return res.status(401).json({message: "Password errata"});
                }

                // Se email e password sono corrette
                res.status(200).json({message: "Login riuscito", user});
            } catch (error) {
                console.error("Errore durante il login:", error);
                res.status(500).json({message: "Errore del server"});
            }
        });
});

module.exports = router;
