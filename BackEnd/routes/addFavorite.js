const express = require('express');
const router = express.Router();
const Favorites = require('../models/Favorites');

/* PUT user favorite event. */
router.put('/', async function (req, res, next) {
    try {
        //bisogna usare gli object id con i riferimenti
        const favorites = new Favorites(req.body);
        const tmp = await Favorites.findOne({id_user: req.body.id_user,id_event:req.body.id_event});
        if(!tmp){
            favorites.save();
        }
        else{
            return res.status(401).json({message: "Favorite already exists"});
        }

        return res.status(200).json({message: "Preferito aggiunto con sucesso"});
    } catch (err) {
        return res.status(401).json({message: err.message});
    }
})

module.exports = router;
