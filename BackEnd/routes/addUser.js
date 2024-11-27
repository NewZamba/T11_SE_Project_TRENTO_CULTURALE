var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.put('/', function(req, res, next)
{
    try {
        const user = new User(req.body);
        user.save();
    }catch(err)
    {
        return res.status(401).json({message: err.message});
    }
    return res.status(200).json({message: "Utente aggiunto con sucesso"});
})

module.exports = router;
