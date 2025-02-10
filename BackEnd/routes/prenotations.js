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

router.get('/:id', async function (req, res, next) {

    try{
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID necessario' });
        }
        console.error(id);

        const lstPrenotations = await Prenotation.find({id_user: id, form: false});

        return res.status(200).json(lstPrenotations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

module.exports = router;