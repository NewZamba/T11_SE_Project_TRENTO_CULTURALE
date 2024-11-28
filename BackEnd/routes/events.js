var express = require('express');
var router = express.Router();
var Event = require("../models/Events");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    const lstEvent = await Event.find();
    if (lstEvent) {
        return res.status(200).json(lstEvent);
    } else {
        return res.status(404).json({message: 'No event found'});
    }
});

module.exports = router;
