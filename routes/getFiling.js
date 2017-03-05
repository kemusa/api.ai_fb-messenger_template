var express = require('express');
var router = express.Router();
var team 

/* GET users listing. */
router.post('/', function(req, res, next) {
  var team = req.body.result.parameters.Companies;
  console.log(team);
});

module.exports = router;
