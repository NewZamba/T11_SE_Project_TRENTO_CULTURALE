const express = require('express');
const router = express.Router();
const Evaluations = require('../models/Evaluations'); // Importa il modello Evaluations

// Endpoint per aggiungere una valutazione
router.post('/', async (req, res) => {
    try {
        const { id_event, id_user} = req.body;

        // Controllo dei parametri
        if (!id_event) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori.' });
        }
        if(!id_user){
            const evaluations = await Evaluations.find({id_event:id_event});
            return res.status(200).json(evaluations);
        }else {
            const evaluation = await Evaluations.findOne({id_event: id_event,id_user : id_user});
            return res.status(200).json(evaluation);
        }
    } catch (error) {
        console.error('Errore nell\'aggiungere la valutazione:', error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
});

module.exports = router;
