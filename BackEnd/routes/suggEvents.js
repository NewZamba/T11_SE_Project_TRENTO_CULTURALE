const express = require('express');
const router = express.Router();
const suggEvents = require("../models/SuggEvents");

/* GET users listing. */
router.get('/get', async function (req, res, next) {
    const lstSuggEvents = await suggEvents.find();

    if (lstSuggEvents) {
        return res.status(200).json(lstSuggEvents);
    } else {
        return res.status(407).json({message: 'Not found'});
    }
});

router.delete('/get/:id', async function (req, res) {
    try {
        const deletedEvent = await suggEvents.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});

router.post('/add', async function (req, res, next) {
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