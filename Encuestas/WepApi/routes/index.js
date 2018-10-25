var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("<html><head></head><body><center><h2>WSEncuesta Ver. 1.0.0.0</h2></center></body></html>");
});

module.exports = router;
