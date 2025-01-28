const express = require('express');
const router = express.Router();
const Events = require('../models/Events');

/* GET users listing. */
router.get('/', function(req, res, next)
{
            console.log("Connessione al database riuscita");
            // Creazione di un oggetto fittizio
            const fakeEvent = new Events({
                name_event: "Workshop Tecnologico",
                location_event: "Roma, Centro Congressi",
                date_event: new Date('2024-12-20'),
                tag_event: 1,
                description_event: "Un workshop dedicato alle ultime innovazioni tecnologiche.",
                img_event: "https://example.com/tech-workshop.jpg"
            });
            // Salvataggio dell'evento nel database
            fakeEvent.save();
            res.status(200).json(fakeEvent);
        })

module.exports = router;
