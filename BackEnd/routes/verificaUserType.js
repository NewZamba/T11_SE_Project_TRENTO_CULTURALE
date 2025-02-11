const express = require('express');
const router = express.Router();
const User = require('../models/User');

/*
1 = user
2 = data analyst
3 = mod
*/

router.get('/is_logged', (req, res) => {
    return req.user ? res.send(req.user) : res.sendStatus(401)
});

router.get('/is_data_analyst', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    if (req.user.type_user === 2) {
        return res.status(200).json(req.user);
    } else {
        return res.status(403).json({ message: 'User is not a data analyst' });
    }
});

router.get('/is_mod', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    if (req.user.type_user === 3) {
        return res.status(200).json(req.user);
    } else {
        return res.status(403).json({ message: 'User is not a data analyst' });
    }
});

module.exports = router;