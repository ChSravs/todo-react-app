const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    DeviceName:
    {
        type:String,
        required:true
    },
    Status:
    {
        type:Boolean,
        required:true
    }
});

const Devices = module.exports = mongoose.model('devices', deviceSchema);