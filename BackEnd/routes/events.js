const express = require('express');
const router = express.Router();
const Event = require("../models/Events");

/* GET users listing. */
router.get('/get', async function (req, res, next) {

    const lstEvent = await Event.find();

    if (lstEvent) {
        return res.status(200).json(lstEvent);
    } else {
        return res.status(404).json({message: 'No event found'});
    }
});

router.get('/not_expired', async function (req, res, next) {
    try {
        const currentDate = new Date();
        const lstEvent = await Event.find({
            date_event: { $gte: currentDate }
        });

        if (lstEvent && lstEvent.length > 0) {
            return res.status(200).json(lstEvent);
        } else {
            return res.status(404).json({message: 'No upcoming events found'});
        }
    } catch (error) {
        return res.status(500).json({message: 'Error retrieving events', error: error.message});
    }
});

/* POST event */
router.post('/add', async function(req, res, next) {
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
