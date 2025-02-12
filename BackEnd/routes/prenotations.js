const express = require('express');
const router = express.Router();
const Prenotation = require("../models/Prenotations");

router.get('/:id', async function (req, res, next) {

    try{
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID necessario' });
        }

        const lstPrenotations = await Prenotation.find({id_user: id, form: false});

        return res.status(200).json(lstPrenotations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});
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