const express = require('express');
const router = express.Router();
const suggEvents = require("../models/SuggEvents");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    const {event} = req.query;
    const lstSuggEvents = await suggEvents.find({id_event: event._id});

    if (lstSuggEvents) {
        return res.status(200).json(lstSuggEvents);
    } else {
        return res.status(404).json({message: 'Not found'});
    }
});

module.exports = router;