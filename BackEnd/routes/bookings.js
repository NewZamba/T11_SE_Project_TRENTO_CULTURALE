const express = require('express');
const router = express.Router();
const Prenotation = require("../models/Prenotations");
const {ObjectId} = require("mongoose");

router.get('/get/:id', async function (req, res, next) {

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

/* GET users listing. */
router.get('/get/', async function (req, res, next) {

    const lstPrenotations = await Prenotation.find();

    if (lstPrenotations) {
        return res.status(200).json(lstPrenotations);
    } else {
        return res.status(404).json({message: 'No prenotation found'});
    }
});


//ALL THESE ARE THE OLD ADDBOOKINGS
router.get('/', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Parametro id mancante' });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID non valido' });
        }

        const c = await Prenotation.countDocuments({ id_event: new ObjectId(id) });

        return res.status(200).json(c);
    } catch (error) {
        return res.status(500).json({ message: 'Errore del server', error });
    }
});

// Endpoint per aggiungere una prenotazione
router.post('/', async (req, res) => {
    console.log('Request reached /Bookings endpoint');

    try {
        const { id_user, id_event, name_event, date_Prenotation, date_event, form, guests_event } = req.body;

        // CONTROLLO SE IL NUMERO DI PRENOTAZIONI DI UN EVENTO E' > DEL NUMERO MAX DI POSTI PER QUELL' EVENTO
        if(guests_event > 0) {
            const prenotationsCount = await Prenotation.countDocuments({ id_event });

            if (prenotationsCount >= guests_event) {
                return res.status(405).json({ message: 'Posto non disponibile!' });
            }
        } // ALTRIMENTI CI SONO POSTI ILLIMITATI

        const existingPrenotation = await Prenotation.findOne({id_user: id_user, id_event: id_event});

        if (existingPrenotation) {
            return res.status(409).json({ message: 'Prenotazione già esistente.' });
        }

        // Crea una nuova prenotazione
        const newPrenotation = new Prenotation({ id_user, id_event, name_event, date_Prenotation, date_event, form });

        await newPrenotation.save();

        return res.status(200).json({ message: 'Prenotazione effettuata con successo!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

router.delete('/', async (req, res) => {
    try {
        const { _id } = req.query;  // Changed from req.params to req.query
        if (!_id) {
            return res.status(400).json({ message: 'Parametro id mancante' });
        }

        const result = await Prenotation.deleteOne({ _id: _id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Prenotazione non trovata' });
        }

        return res.status(200).json({ message: 'Prenotazione eliminata con successo' });
    } catch (err) {
        return res.status(500).json({ message: 'Errore del server.' });
    }
});


module.exports = router;