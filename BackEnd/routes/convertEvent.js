const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const suggEvents = require("../models/SuggEvents");

router.post('/sug_to_off', async function (req, res, next) {
    try {
        const { suggEventId, location_event } = req.body;

        if (!suggEventId || !location_event) {
            return res.status(400).json({ message: 'Parametri mancanti!' });
        }

        const suggEvent = await suggEvents.findById(suggEventId);
        if (!suggEvent) {
            return res.status(404).json({ message: 'Evento suggerito non trovato!' });
        }

        const newEvent = new Event({
            name_event: suggEvent.name_event,
            location_event: location_event,
            date_event: suggEvent.date_event,
            tags_event: suggEvent.tags_event,
            description_event: suggEvent.description_event,
            img_event: suggEvent.img_event,
            guests_event: suggEvent.guests_event
        });

        await newEvent.save();

        await suggEvents.findByIdAndDelete(suggEventId);

        return res.status(200).json({message: "Evento convertito con successo"});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;