var express = require('express');
var router = express.Router();
const User = require('../models/User');

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({message: "Unauthorized"});
    }
}

router.get('/', isAuthenticated, (req, res) => {
    res.json({message: "You have access to this route"});
});



module.exports = router;