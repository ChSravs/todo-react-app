const express = require('express');
const router = express.Router();
const Devices = require('../models/devices');

router.get('/DeviceStatus',function(req,res,next){
    console.log(req.body);
    Devices.findOne({DeviceName:req.body.device_name}(function (err,results){
      if (err) return  res.send(err);
      res.send(results)
    }));
});
router.post('/addDevice', function (req, res, next) {
    console.log(req.body);
    Devices.create(req.body, function (err, user) {
      if (err) return next(err)
      res.json(user);
    });
  });
router.put('/updateStatus', function (req, res, next) {
    console.log(req.body);
    Devices.updateOne({DeviceName:req.body.device_name},{Status:req.body.new_Status}, function (err, user) {
      if (err) return next(err)
      res.json(user);
    });
});

module.exports = router;