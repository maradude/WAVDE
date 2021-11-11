var express = require('express');
var router = express.Router();
var JWT = require('../models/jwt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  try {
    JWT.save(req.ip, req.body.jwt)
  } catch (err) {
    console.log("unexpected input", err)
  }
  res.send('thanks')
})

module.exports = router;
