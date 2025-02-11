const express = require('express');
const router = express.Router();
const suggEvents = require("../models/SuggEvents");

/* GET users listing. */
router.get('/', async function (req, res, next) {

    const lstSuggEvents = await suggEvents.find();

    if (lstSuggEvents) {
        return res.status(200).json(lstSuggEvents);
    } else {
        return res.status(407).json({message: 'Not found'});
    }
});

router.delete('/:id', async function (req, res) {
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

module.exports = router;