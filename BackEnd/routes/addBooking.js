const express = require('express');
const router = express.Router();
const Prenotations = require('../models/Prenotations');
const {ObjectId} = require("mongodb");

router.get('/', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Parametro id mancante' });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID non valido' });
        }

        const c = await Prenotations.countDocuments({ id_event: new ObjectId(id) });

        return res.status(200).json(c);
    } catch (error) {
        return res.status(500).json({ message: 'Errore del server', error });
    }
});

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
