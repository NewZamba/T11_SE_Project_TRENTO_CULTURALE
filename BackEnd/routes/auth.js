const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'email_user',
        passwordField: 'pass_user'
    },
    async function verify(email, password, cb) {
        // cd (callback) ritorna a tuple (err, user, info)
        try {
            // Controlla se l'utente esiste
            const user = await User.findOne({ email_user: email });
            if (!user) {return cb(null, false, {message: "Utente non trovato"});}

            // Controlla se la password è corretta
            const isPasswordCorrect = await bcrypt.compare(password, user.pass_user);
            if (!isPasswordCorrect) {return cb(null, false, {message: "Password errata"});}

            // Login accettato
            return cb(null, user);
        } catch (err) {
            return cb(err, false, {message: "Errore durante il login"});
        }
    }));

passport.use(new GoogleStrategy(
    {
        //TODO: rimuovere credenziali hardcoded
        clientID: process.env.GOOGLE_CLIENT_ID || "717785974814-li5mg279rnq3mml7u828sq4jnifckkou.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    async function verify(req, accessToken, refreshToken, profile, cb) {
        try {
            // Controlla se l'utente esiste
            let user = await User.findOne({ email_user: profile.emails[0].value });

            if (user) {
                // Se esiste login
                return cb(null, user);
            } else {
                // Altrimenti signup
                const newUser = new User({
                    name_user: profile.name.givenName,
                    surname_user: profile.name.familyName,
                    email_user: profile.emails[0].value,
                    pass_user: 'google_oauth', // Password? Dove stiamo andando, non c’è bisogno di Password!
                    type_user: 1, //TODO: implementare un modo per decidere l'user type
                    google_id: profile.id
                });

                await newUser.save();
                return cb(null, newUser);
            }
        } catch (err) {
            return cb(err, null);
        }
    }));

// serializza i dati temporanei della sessione
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializza i dati temporanei della sessione
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

/* POST login user  */
router.post('/login',  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        // logga l'user
        req.login(user, (err) => {
            // errore imprevisto
            if (err) {return res.status(500).json({ message: "Errore durante il login", error: err });}

            // utente non trovato o password sbagliata
            if (!user) {return res.status(404).json({message: info.message});}

            return res.status(200).json({
                message: "Login effettuato con successo",
                user: {
                    id: user._id,
                    email: user.email_user,
                    type: user.type_user
                }
            });
        });
    })(req, res, next);
});

/* POST register user */
router.post('/signup', async function (req, res, next) {
    try {
        const { name_user, surname_user, email_user, pass_user, age_user, phone_user, type_user } = req.body;

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

/* POST logout user */
router.post('/logout', (req, res, next) => {
    // Controlla se l'User e' loggato
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Nessun utente da sloggare" });
    }

    // logout
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Errore durante il logout", error: err });
        }
        return res.status(200).json({ message: "Logout avvenuto con sucesso" });
    });
});

/* GET google authentication user */
router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

/* GET google authentication callback */
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/login',
        failureMessage: true
    }),
    function (req, res) {
        // logga l'user
        req.login(req.user, (err) => {
            if (err) {
                return res.status(500).json({ message: "Errore durante il login con Google", error: err });
            }
            // Respond after login is complete
            /*res.status(200).json({
                message: "Login con Google effettuato con successo",
                user: {
                    id: req.user._id,
                    email: req.user.email_user,
                    type: req.user.type_user
                }
            });*/
        });
        res.redirect('http://localhost:5173/UserHome');
    }
);

module.exports = router;