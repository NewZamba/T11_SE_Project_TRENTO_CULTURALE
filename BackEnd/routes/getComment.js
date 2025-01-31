const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Modello Comment

// Funzione ricorsiva per organizzare i commenti
const organizeComments = (comments, parentId = null) => {
    return comments
        .filter(comment => String(comment.id_Parent) === String(parentId))
        .sort((a, b) => a.z_index - b.z_index) // Ordina per z_index
        .map(comment => ({
            ...comment.toObject(), // Converte il commento in un oggetto JS
            replies: organizeComments(comments, comment._id) || [] // Chiama ricorsivamente per ottenere le risposte
        }));
};

// Endpoint per ottenere i commenti di un evento
router.post('/', async (req, res) => {
    try {
        const { id } = req.body;
        // Recupera tutti i commenti associati all'evento
        const comments = await Comment.find({ id_event: id });
        if (!comments.length) {
            return res.status(404).json({ message: 'Nessun commento trovato per questo evento.' });
        }

        // Organizza i commenti in una struttura ricorsiva
        const organizedComments = organizeComments(comments);

        // Risponde con i commenti organizzati
        return res.status(200).json({
            message: 'Commenti recuperati con successo.',
            comments: organizedComments,
        });
    } catch (err) {
        console.error('Errore durante il recupero dei commenti:', err);
        return res.status(500).json({ message: 'Errore del server. Riprova più tardi.' });
    }
});

module.exports = router;
