const express = require('express');
const router = express.Router();
const Tag = require("../models/Tags");

/* GET tag listing. */
router.get('/get', async function (req, res, next) {
    const lstTag = await Tag.find();

    if (lstTag) {
        return res.status(200).json(lstTag);
    } else {
        return res.status(404).json({message: 'No tag found'});
    }
});

/* POST tag */
router.post('/add', async function(req, res, next) {
    try {
        const {name_tag, color_tag} = req.body;

        if (!name_tag || !color_tag) {
            return res.status(400).json({ message: "Dati mancanti" });
        }

        const tag = new Tag({
            name_tag,
            color_tag,
        });

        await tag.save();

        return res.status(200).json({message: "tag aggiunta con sucesso"});
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
});


module.exports = router;
