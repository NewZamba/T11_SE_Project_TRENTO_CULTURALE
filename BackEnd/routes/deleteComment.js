const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Funzione per eliminare ricorsivamente un commento e i suoi figli
const deleteCommentsRecursive = async (commentId) => {
    const childComments = await Comment.find({ id_Parent: commentId });
    for (const child of childComments) {
        await deleteCommentsRecursive(child._id); // Chiamata ricorsiva per i figli
    }
    await Comment.findByIdAndDelete(commentId); // Elimina il commento stesso
};

// Endpoint per eliminare un commento e tutti i suoi figli
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: 'Commento non trovato' });
        }

        await deleteCommentsRecursive(id);

        return res.status(200).json({ message: 'Commento e risposte eliminate con successo' });
    } catch (err) {
        console.error("Errore durante l'eliminazione del commento:", err);
        return res.status(500).json({ message: 'Errore del server. Riprova più tardi.' });
    }
});

module.exports = router;