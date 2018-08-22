const express = require('express');
const router = express.Router();
const Products = require('../models/products');

/* GET users listing. */
router.post('/addItem', function (req, res, next) {
  console.log(req.body);
  Products.create(req.body, function (err, user) {
    if (err) return next(err)
    res.json(user);
  });
});
/** List of Users */
router.get('/getItems', function (req, res, next) {
  Products.find((function (err, results) {
    if (err) return res.send(err);
    res.send(results)
  }));
});
module.exports = router;