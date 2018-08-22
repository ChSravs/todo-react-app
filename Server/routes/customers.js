const express = require('express');
const router = express.Router();
const Customer = require('../models/customers');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  console.log(req.body);
  Customer.create(req.body,function(err,user){
    if(err) return next(err)
    res.json(user);
  })
});
/** List of Users */
router.get('/getUsers',function(req,res,next){
  console.log(req.body);
  Customer.find((function (err,results){
    if (err) return  res.send(err);
    res.send(results)
  }));
});
module.exports = router;