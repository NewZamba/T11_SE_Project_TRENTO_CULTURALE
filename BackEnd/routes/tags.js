const express = require('express');
const router = express.Router();
const Tag = require("../models/Tags");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    const lstTag = await Tag.find();

    if (lstTag) {
        return res.status(200).json(lstTag);
    } else {
        return res.status(404).json({message: 'No tag found'});
    }
});

module.exports = router;
