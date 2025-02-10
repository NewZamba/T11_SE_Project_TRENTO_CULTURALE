const express = require('express');
const router = express.Router();
const FormEvents = require('../models/FormEvents');
const Prenotations = require('../models/Prenotations');

router.post('/', async (req, res) => {

    try {
        const { id_user, id_event, name_event, feedback,rating } = req.body;

        if (!id_user || !id_event || !name_event || !feedback||!rating) {
            return res.status(400).json({ message: 'Campi necessari!' });
        }
        const newForm = new FormEvents({ id_user, id_event, name_event, feedback,rating });

        await newForm.save();

        return res.status(200).json({ message: 'Prenotazione effettuata con successo!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

router.put('/', async (req, res) => {
    try {
        const { id_event, id_user } = req.body;

        if (!id_event || !id_user) {
            return res.status(400).json({ message: 'Campi necessari!' });
        }

        await Prenotations.findOneAndUpdate(
            {
                id_user: id_user,
                id_event: id_event,
                form: false
            },
            { $set: { form: true } },
            { new: true }
        );

        return res.status(200).json({ message: 'Prenotazione effettuata con successo!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

module.exports = router;
