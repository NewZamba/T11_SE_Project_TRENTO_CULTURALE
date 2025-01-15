var express = require('express');
var router = express.Router();
const User = require('../models/User');

/*
1 = user
2 = mod
3 = data analyst
*/

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "Non loggato" });
};

const isMod = (req, res, next) => {
    if (req.isAuthenticated() && req.user.type_user === 2) {
        return next();
    }
    return res.status(402).json({ message: "privilegi da Moderatore richesti" });
};

const isDataAnalyst = (req, res, next) => {
    if (req.isAuthenticated() && req.user.type_user === 3) {
        return next();
    }
    return res.status(402).json({ message: "privilegi da Data Analyst richesti" });
};

router.get('/user-home', isAuthenticated, (req, res) => {
    res.json({message: "Accesso consentito"});
});

router.get('/mod-home', isAuthenticated, isMod, (req, res) => {
    res.json({message: "Accesso consentito"});
});

router.get('/data-analyst-home', isAuthenticated, isDataAnalyst, (req, res) => {
    res.json({message: "Accesso consentito"});
});


module.exports = router;