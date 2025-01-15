/**
 * @deprecated ora Auth.js sostituisce sia il login che la registrazione
 */


var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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

        // dati temporanei della sessioni
        req.session.user = {
            id: user._id,
            email: user.email_user,
            type: user.type_user
        };

        // Se email e password sono corrette
        res.body = JSON.stringify(user);
        return res.status(200).json({message: "Login riuscito", user});

    } catch (error) {
        console.error("Errore durante il login:", error);
        return res.status(500).json({message: "Errore del server"});
    }
});

/* POST login user with google */
router.post('/auth/google/callback', async function (req, res, next) {
    const { credential } = req.body;

    try {
        // Configure OAuth2Client with your Google Client ID
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Get the payload from the verified ticket
        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // Check if user already exists in the database
        let user = await User.findOne({ email_user: email });

        if (!user) {
            // Create a new user if not exists
            user = new User({
                email_user: email,
                name_user: name,
                google_id: googleId,
                pass_user: await bcrypt.hash(googleId, 10), // Generate a secure temporary password
                type_user: 2
            });

            await user.save();
        }

        // Set user session
        req.session.user = {
            id: user._id,
            email: user.email_user
        };

        // Return user information
        return res.status(200).json({
            message: "Google Login riuscito",
            user: {
                id: user._id,
                email: user.email_user,
                name: user.name_user
            }
        });

    } catch (error) {
        console.error("Errore durante il login Google:", error);
        return res.status(500).json({ message: "Errore del server durante l'autenticazione Google" });
    }
});

module.exports = router;



/*
router.post('/google-auth', async function (req, res, next) {
    const { credential } = req.body;

    try {
        const client = new OAuth2Client('587301-d27f8hofgi6i0.apps.googleusercontent.com');

        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: '587301-d27f8hofgi6i0.apps.googleusercontent.com'
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // Check if user already exists in database
        let user = await User.findOne({ email_user: email });

        if (!user) {
            // Create new user if not exists
            user = new User({
                email_user: email,
                name_user: name,
                google_id: googleId,
                pass_user: await bcrypt.hash(googleId, 10) // Generate a secure random password
            });

            await user.save();
        }

        // Set user session
        req.session.user = {
            id: user._id,
            email: user.email_user
        };

        // Respond with user details
        return res.status(200).json({
            message: "Google Login successful",
            user: {
                id: user._id,
                email: user.email_user,
                name: user.name_user
            }
        });

    } catch (error) {
        console.error("Errore durante il login Google:", error);
        return res.status(401).json({ message: "Autenticazione Google fallita" });
    }
});
 */