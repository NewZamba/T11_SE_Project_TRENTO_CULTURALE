const express = require('express');
const router = express.Router();
const Prenotation = require("../models/Prenotations");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    const lstPrenotations = await Prenotation.find();

    if (lstPrenotations) {
        return res.status(200).json(lstPrenotations);
    } else {
        return res.status(404).json({message: 'No prenotation found'});
    }
});

module.exports = router;