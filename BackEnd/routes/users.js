var express = require('express');
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const lstUser = await User.find();
  if (lstUser) {
    return res.status(200).json(lstUser);
  } else {
    return res.status(404).json({message: 'No user found'});
  }
});

router.patch('/suspend', async function (req, res, next) {
  try {
    const { ban_until_date, user_id } = req.body;

    const user = await User.findByIdAndUpdate(
        user_id,
        { ban_until_date: new Date(ban_until_date) },
        { new: true } // ritorna l'user con il dato aggiornato
    );

    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    return res.status(200).json({message: 'Utente sospeso', user: user});
  } catch (err) {
    return res.status(500).json({message: 'Errore', error: err.message});
  }
});

router.patch('/unsuspend', async function (req, res, next) {
  try {
    const { user_id } = req.body;

    const user = await User.findByIdAndUpdate(
        user_id,
        { ban_until_date: null },
        { new: true } // Ritorna l'utente aggiornato
    );

    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    return res.status(200).json({ message: 'Utente riattivato', user: user });
  } catch (err) {
    return res.status(500).json({ message: 'Errore', error: err.message });
  }
});


module.exports = router;