const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String
    },
    username:{
        type: String ,
        unique: true,
        lowercase: true,
        required:[{message:"username should not be empty",code:1}],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    DOB: {
        type: Date,
        required:true
    },
    Gender: {
        type:String,
        enum:['male','female'],
    },
    password:{
        type: String ,
        required:[{message:"Password should not be empty",code:1}],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,'Please fill a valid Password address']        
    },
});

const Customer = module.exports = mongoose.model('customers', userSchema);

