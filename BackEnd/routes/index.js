var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.session);
  console.log(req.session.id);
  //req.session.visited = true
  res.cookie("hello", "world");
  res.status(201).send({msg: "porco di"});
});

module.exports = router;
