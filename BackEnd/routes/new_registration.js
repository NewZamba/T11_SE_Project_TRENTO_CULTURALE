var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


/* POST register user */
router.post('/', async function (req, res, next) {
    try {
        const {name_user, surname_user, email_user, pass_user } = req.body;

        // Check if all required fields are provided
        if (!name_user) {
            return res.status(200).json({ message: "Il campo nome è obbligatorio" });
        }
        if (!surname_user) {
            return res.status(200).json({ message: "Il campo cognome è obbligatorio" });
        }
        if (!email_user) {
            return res.status(200).json({ message: "Il campo email è obbligatorio" });
        }
        if (!pass_user) {
            return res.status(200).json({ message: "Il campo password è obbligatorio" });
        }

        // Controlla se e' una nuova email
        const existingUser = await User.findOne({email_user: email_user});
        if (existingUser) {
            return res.status(400).json({ message: "Utente gia' registrato" });
        }

        // Crypta la password
        const saltRounds = 10; // piu' sono meglio e'
        const hashedPassword = await bcrypt.hash(pass_user, saltRounds);

        // Crea un nuovo user
        const user = new User({
            id_user: Date.now(),
            name_user,
            surname_user,
            email_user,
            pass_user: hashedPassword,
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