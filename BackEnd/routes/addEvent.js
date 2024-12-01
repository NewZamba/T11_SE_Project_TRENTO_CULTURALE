var express = require('express');
var router = express.Router();
const Event = require('../models/Events');

/* PUT event */
router.put('/', function(req, res, next)
{
    try {
        const event = new Event(req.body);
        event.save();
    }catch(err)
    {
        return res.status(401).json({message: err.message});
    }
    return res.status(200).json({message: "Evento aggiunto con sucesso"});
})

module.exports = router;
