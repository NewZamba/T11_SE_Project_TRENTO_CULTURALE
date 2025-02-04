const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

/* POST event */
router.post('/', async function(req, res, next) {
    try {
        const {name_event, location_event, date_event, tags_event, description_event, img_event, guests_event} = req.body;

        if (!name_event || !location_event || !date_event || !tags_event || !description_event || !img_event || !guests_event) {
            return res.status(400).json({ message: "Dati mancanti" });
        }

        const event = new Event({
            name_event,
            location_event,
            date_event,
            tags_event,
            description_event,
            img_event,
            guests_event,
        });

        await event.save();

        return res.status(200).json({message: "Evento aggiunto con sucesso"});
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
});

module.exports = router;

