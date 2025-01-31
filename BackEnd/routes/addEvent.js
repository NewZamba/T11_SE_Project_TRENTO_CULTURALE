var express = require('express');
var router = express.Router();
const Event = require('../models/Events');
const User = require("../models/User");

/* POST event */
router.post('/', async function(req, res, next)
{
    try {
        const { name_event, location_event, date_event, tag_event, description_event, img_event } = req.body;

        if (!name_event || !location_event || !date_event || !tag_event || !description_event || !img_event) {
            return res.status(404).json({ message: "Dati mancanti" });
        }

        const event = new Event({
            name_event,
            location_event,
            date_event,
            tag_event,
            description_event,
            img_event,
        });
        event.save();
    }catch(err) {
        return res.status(401).json({message: err.message});
    }
    return res.status(200).json({message: "Evento aggiunto con sucesso"});
})

module.exports = router;
