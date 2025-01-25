const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Importa il modello Comment

// Middleware di validazione
const validateCommentInput = (req, res, next) => {
    const { id_event, id_user, text, date, user_name, z_index } = req.body;

    if (!id_event || !id_user || !text || !date || !user_name || z_index === undefined) {
        return res.status(400).json({ message: 'Tutti i campi richiesti devono essere compilati!' });
    }

    next();
};

// Endpoint per aggiungere un commento
router.post('/', validateCommentInput, async (req, res) => {
    try {
        const { id_event, id_user, id_Parent, text, date, user_name, z_index } = req.body;

        console.log(req.body);

        // Creazione di un nuovo commento
        const newComment = new Comment({
            id_event,
            id_user,
            id_Parent: id_Parent || null, // Imposta null se id_Parent non è fornito
            text,
            date,
            user_name,
            z_index,
        });

        // Salvataggio nel database
        const savedComment = await newComment.save();

        // Risposta al client con l'ID del commento salvato
        return res.status(201).json({
            message: 'Commento aggiunto con successo!',
            comment: {
                id: savedComment._id,
                text: savedComment.text,
                date: savedComment.date,
                user_name: savedComment.user_name,
                z_index: savedComment.z_index,
                id_Parent: savedComment.id_Parent,
                id_event: savedComment.id_event,
                id_user: savedComment.id_user,
            },
        });
    } catch (err) {
        console.error('Errore durante l\'aggiunta del commento:', err);
        return res.status(500).json({ message: 'Errore del server. Riprova più tardi.' });
    }
});

module.exports = router;
