var express = require('express');
var router = express.Router();
const User = require('../models/User');

/*
0 = user
1 = mod
2 = data analyst
*/

// const isUserAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     return res.status(401).json({ message: "Non loggato"}); //is_authenticated: false
// };
//
// const isMod = (req, res, next) => {
//     if (req.isAuthenticated() && req.user.type_user === 2) {
//         return next();
//     }
//     return res.status(402).json({ message: "privilegi da Moderatore richesti" });
// };
//
// const isDataAnalyst = (req, res, next) => {
//     if (req.isAuthenticated() && req.user.type_user === 3) {
//         return next();
//     }
//     return res.status(402).json({ message: "privilegi da Data Analyst richesti" });
// };
//
// router.get('/user-home', isUserAuthenticated, (req, res) => {
//     res.json({message: "Accesso consentito"});
// });
//
// router.get('/mod-home', isUserAuthenticated, isMod, (req, res) => {
//     res.json({message: "Accesso consentito"});
// });
//
// router.get('/data-analyst-home', isUserAuthenticated, isDataAnalyst, (req, res) => {
//     res.json({message: "Accesso consentito"});
// });

router.get('/test', (req, res) => {
    console.log(req.user);
    return req.user ? res.send(req.user) : res.sendStatus(401)
});


module.exports = router;