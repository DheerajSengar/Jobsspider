var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page - serve React application */
router.get('/', function(req, res, next) {
  const indexPath = path.join(__dirname, '../../build', 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

module.exports = router;
