const express = require('express');
const router = express.Router();
const Evaluations = require('../models/Evaluations'); // Importa il modello Evaluations

// Endpoint per ricevere una valutazione
router.post('/get', async (req, res) => {
    try {
        const { id_event, id_user} = req.body;
        // Controllo dei parametri
        if (!id_event) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori.' });
        }

        if(!id_user){
            const evaluations = await Evaluations.find({id_event:id_event});
            console.log(evaluations);
            return res.status(200).json(evaluations);
        }else {
            const evaluation = await Evaluations.findOne({id_event: id_event,id_user : id_user});
            return res.status(200).json(evaluation);
        }
    } catch (error) {
        console.error('Errore nell\'ottenere la valutazione:', error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
});

// Endpoint per aggiungere una valutazione
router.post('/add', async (req, res) => {
    try {
        const { id_event, id_user, rating } = req.body;

        // Controllo dei parametri
        if (!id_event || !id_user || !rating) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori.' });
        }

        const ev = await Evaluations.findOne({id_event:id_event,id_user:id_user});
        if(!ev){
            // Crea una nuova valutazione
            const newEvaluation = new Evaluations({
                id_event,
                id_user,
                rating
            });

            // Salva la valutazione nel database
            await newEvaluation.save();

            return  res.status(201).json({ message: 'Valutazione aggiunta con successo!', evaluation: newEvaluation });
        }else {
            ev.rating = rating;
            await ev.save()
            return res.status(202).json({ message: 'Evaluation aggiornata con sucesso.',evaluation : ev });
        }
    } catch (error) {
        console.error('Errore nell\'aggiungere la valutazione:', error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
});

module.exports = router;
