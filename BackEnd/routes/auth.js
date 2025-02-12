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
    async (email_user, pass_user, done) => {
    // console.log(`Email: ${email_user}, Password: ${pass_user}`);
    try {
        // Controlla se l'utente esiste
        const user = await User.findOne({ email_user: email_user });
        if (!user) throw new Error("Utente non trovato");

        // Controlla se la password è corretta
        const isPasswordCorrect = await bcrypt.compare(pass_user, user.pass_user);
        if (!isPasswordCorrect) throw new Error("Password errata");

        // Controlla se l'utente e' stato bannato
        if (user.ban_until_date && new Date() < new Date(user.ban_until_date)) {
            throw new Error(`Utente sospeso fino al ${new Date(user.ban_until_date).toLocaleDateString()}`);
        }

        // done ritorna a tuple (err, user)
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    async function verify(req, accessToken, refreshToken, profile, done) {
        try {
            // Controlla se l'utente esiste
            const user = await User.findOne({ email_user: profile.emails[0].value });

            if (user) {
                // Se esiste login (prima controlla se l'utente e' stato bannato)
                if (user.ban_until_date && new Date() < new Date(user.ban_until_date)) {
                    throw new Error(`Utente sospeso fino al ${new Date(user.ban_until_date).toLocaleDateString()}`);
                }

                done(null, user);
            } else {
                // Altrimenti signup
                const newUser = new User({
                    name_user: profile.name.givenName || null,
                    surname_user: profile.name.familyName || null,
                    email_user: profile.emails[0].value,
                    pass_user: 'google_oauth', // Password? Dove stiamo andando, non c’è bisogno di Password!
                    type_user: 0,
                    google_id: profile.id
                });

                // Salva l'User
                await newUser.save();

                done(null, user);
            }
        } catch (err) {
            done(err, null);
        }
    }));

// serializza i dati temporanei della sessione
passport.serializeUser((user, done) => {
    done(null, user.id); //user.id e' l'id di mongoDB dell'user
});

// deserializza i dati temporanei della sessione
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


/* POST login user  */
router.post(
    '/login',
    passport.authenticate('local', {
        failWithError: true,
        session: true
    }),
    (req, res) => {
        res.status(200).json({ type_user: req.user.type_user });
    },
    (err, req, res, next) => {
        // Error handler
        return res.status(401).json({
            message: err.message || 'Errore di autenticazione'
        });
    }
);

/* POST register user */
router.post('/signup', async function (req, res, next) {
    try {
        const { name_user, surname_user, email_user, pass_user, age_user, type_user, ban_until_date } = req.body;

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
            type_user,
            ban_until_date
        });

        // Salva l'User
        await user.save();

        return res.status(200).json({message: "Utente aggiunto con sucesso"});
    } catch(err) {
        console.error('Registration error:', err);
        return res.status(402).json({ message: "Utente non aggiunto: ", error: err.message });
    }
});

/* POST logout user */
// router.post('/logout', (req, res, next) => {
//     // Controlla se l'User e' loggato
//     if (!req.isAuthenticated()) {
//         return res.status(403).json({ message: "Nessun utente da sloggare" });
//     }
//
//     // logout
//     req.logout((err) => {
//         if (err) {
//             return res.status(500).json({ message: "Errore durante il logout", error: err });
//         }
//         return res.status(200).json({ message: "Logout avvenuto con sucesso" });
//     });
// });

/* POST logout user */
router.post('/logout', (req, res, next) => {
    // Controlla se l'User e' loggato
    if (!req.isAuthenticated()) {
        return res.status(403).json({ message: "Nessun utente da sloggare" });
    }

    // Clear session and cookies
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Errore durante il logout", error: err });
        }

        // Clear session cookie
        res.clearCookie('connect.sid');

        // Clear any other cookies we set
        res.clearCookie('id_user');

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
                return res.status(500).json({ message: "Errore durante il login", error: err });
            }

            // return res.status(200).json({
            //     message: "Login effettuato con successo",
            //     user: {
            //         id: user._id,
            //         email: user.email_user,
            //         type_user: user.type_user
            //     }
            // });
        });
        res.redirect('http://localhost:5173/UserHome');
    }
);

module.exports = router;