const express = require('express');
const router = express.Router();
const Prenotations = require('../models/Prenotations');

// Endpoint per aggiungere una prenotazione
router.post('/', async (req, res) => {
    console.log('Request reached /addBooking endpoint');

    try {
        const { id_user, id_event, date_Prenotation, guests_event} = req.body;

        if (!id_user || !id_event || !date_Prenotation) {
            return res.status(400).json({ message: 'Campi necessari!' });
        }

        // CONTROLLO SE IL NUMERO DI PRENOTAZIONI DI UN EVENTO E' > DEL NUMERO MAX DI POSTI PER QUELL' EVENTO
        if(guests_event > 0) {
            const prenotationsCount = await Prenotations.countDocuments({ id_event });

            if (prenotationsCount >= guests_event) {
                return res.status(405).json({ message: 'Posto non disponibile!' });
            }
        } // ALTRIMENTI CI SONO POSTI ILLIMITATI

        const existingPrenotation = await Prenotations.findOne({id_user: id_user,id_event: id_event});

        if (existingPrenotation) {
            return res.status(409).json({ message: 'Prenotazione già esistente.' });
        }

        // Crea una nuova prenotazione
        const newPrenotation = new Prenotations({ id_user, id_event, date_Prenotation });

        await newPrenotation.save();

        return res.status(200).json({ message: 'Prenotazione effettuata con successo!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

module.exports = router;
