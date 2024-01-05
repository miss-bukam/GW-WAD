let express = require('express');
let router = express.Router();

/* GET http://localhost:8000/ returns index.html */
router.get('/', function(req, res) {
  res.render('index.html', { title: 'Home' });
});

module.exports = router;
