const express = require('express');
const router = express.Router();
const Prenotations = require('../models/Prenotations');

// Endpoint per aggiungere una prenotazione
router.put('/', async (req, res) => {
    console.log('Request reached /addBooking endpoint');

    try {
        const { id_user, id_event, date_Prenotation } = req.body;

        if (!id_user || !id_event || !date_Prenotation) {
            return res.status(400).json({ message: 'Tutti i campi sono richiesti.' });
        }

        const existingPrenotation = await Prenotations.findOne({id_user:id_user,id_event:id_event});

        if (existingPrenotation) {
            return res.status(409).json({ message: 'Prenotazione già esistente.' });
        }

        // Crea una nuova prenotazione
        const newPrenotation = new Prenotations(req.body);

        await newPrenotation.save();

        return res.status(200).json({ message: 'Prenotazione effettuata con successo!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

module.exports = router;
