const express = require('express');
const router = express.Router();
const suggEvents = require("../models/SuggEvents");

router.post('/', async function (req, res, next) {
    try {
        const { id_user, name_event, date_event, tags_event, description_event, img_event, guests_event } = req.body;

        if (!id_user || !name_event || !date_event || !tags_event || !description_event || !guests_event) {
            return res.status(400).json({ message: 'Parametri mancanti!' });
        }

        const suggEvent = new suggEvents({
            id_user,
            name_event,
            date_event,
            tags_event,
            description_event,
            img_event,
            guests_event
        });

        await suggEvent.save();

        return res.status(200).json({message: "Evento aggiunto con sucesso"});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
});

module.exports = router;