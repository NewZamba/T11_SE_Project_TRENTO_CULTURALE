var express = require('express');
var router = express.Router();
const Events = require('../models/Events');
const mongoose = require("mongoose");

/* GET users listing. */
router.get('/', function(req, res, next)
{
    mongoose.connect('mongodb+srv://fraCok:fraCok@cluster0.c9u75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connessione al database riuscita");
            // Creazione di un oggetto fittizio
            const fakeEvent = new Events({
                id_event: 101,
                name_event: "Workshop Tecnologico",
                location_event: "Roma, Centro Congressi",
                date_event: new Date('2024-12-20'),
                tag_event: 1,
                description_event: "Un workshop dedicato alle ultime innovazioni tecnologiche.",
                img_event: "https://example.com/tech-workshop.jpg"
            });

            // Salvataggio dell'evento nel database
            return fakeEvent.save();
        })
        .then(event => {
            console.log("Evento creato con successo:", event);
            mongoose.connection.close(); // Chiude la connessione
        })
        .catch(err => {
            console.error("Errore:", err);
            mongoose.connection.close(); // Chiude la connessione anche in caso di errore
        });
});

module.exports = router;
