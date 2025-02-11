const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const user_model = require('../models/User');

// Middleware di validazione
const validateCommentInput = (req, res, next) => {
    const { id_event, id_user, text, date, z_index } = req.body;

    if (!id_event || !id_user || !text || !date || z_index === undefined) {
        return res.status(400).json({ message: 'Tutti i campi richiesti devono essere compilati!' });
    }

    next();
};

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

// Funzione per eliminare ricorsivamente un commento e i suoi figli
const deleteCommentsRecursive = async (commentId) => {
    const childComments = await Comment.find({ id_Parent: commentId });
    for (const child of childComments) {
        await deleteCommentsRecursive(child._id); // Chiamata ricorsiva per i figli
    }
    await Comment.findByIdAndDelete(commentId); // Elimina il commento stesso
};

// Endpoint per aggiungere un commento
router.post('/add', validateCommentInput, async (req, res) => {
    try {
        const { id_event, id_user, id_Parent, text, date, z_index } = req.body;
        console.log(id_user)
        const tmpUser = await user_model.findById(id_user);
        console.log(tmpUser);
        if(!tmpUser) {
            return res.status(400).json({ message: "Utente inesistente" });
        }
        // Creazione di un nuovo commento
        const newComment = new Comment({
            id_event,
            id_user,
            id_Parent: id_Parent || null, // Imposta null se id_Parent non è fornito
            text,
            date,
            user_name: tmpUser.name_user + " " + tmpUser.surname_user,
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

// Endpoint per ottenere i commenti di un evento
router.post('/get', async (req, res) => {
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

// Endpoint per eliminare un commento e tutti i suoi figli
router.delete('/del/:id', async (req, res) => {
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