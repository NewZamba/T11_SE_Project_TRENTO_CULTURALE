const express = require('express');
const router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get('/', async function (req, res, next) {

  const lstUser = await User.find();
  if (lstUser) {
    return res.status(200).json(lstUser);
  } else {
    return res.status(404).json({message: 'No user found'});
  }
});

module.exports = router;
