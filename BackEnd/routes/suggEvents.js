const express = require('express');
const router = express.Router();
const suggEvents = require("../models/SuggEvents");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    const lstSuggEvents = await suggEvents.find();

    if (lstSuggEvents) {
        return res.status(200).json(lstSuggEvents);
    } else {
        return res.status(407).json({message: 'Not found'});
    }
});

module.exports = router;