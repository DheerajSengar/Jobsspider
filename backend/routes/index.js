var express = require('express');
var router = express.Router();

/* GET deployment health check */
router.get('/', function(req, res) {
  res.status(200).json({ status: true, message: 'JobSpider API is running' });
});

module.exports = router;
