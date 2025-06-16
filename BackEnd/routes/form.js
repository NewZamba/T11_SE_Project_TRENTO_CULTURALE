const express = require('express');
const router = express.Router();
const FormEvents = require('../models/FormEvents');
const Prenotations = require('../models/Prenotations');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
        const { id_user, id_event, name_event, feedback, rating } = req.body;

        if (!id_user || !id_event || !name_event || !feedback || !rating) {
            return res.status(400).json({ message: 'Campi necessari!' });
        }
        const newForm = new FormEvents({ id_user, id_event, name_event, feedback, rating });

        await newForm.save();

        return res.status(200).json({ message: 'Form inviato con successo!' });
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

        return res.status(200).json({ message: 'Form updated!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore del server.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { id_event } = req.query;  // Changed from req.body to req.query

        if (!id_event || !mongoose.Types.ObjectId.isValid(id_event)) {
            return res.status(400).json({ message: 'Valid Event ID is required' });
        }

        const lstForm = await FormEvents.find({ id_event: id_event });

        if (!lstForm || lstForm.length === 0) {
            return res.status(404).json({ message: 'No forms found for this event' });
        }

        return res.status(200).json(lstForm);
    } catch (error) {
        console.error('Error fetching form events:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
