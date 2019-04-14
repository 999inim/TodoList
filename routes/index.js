var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/task', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.send('Hello task !');
  res.sendfile('./public/index.html');
});

module.exports = router;
