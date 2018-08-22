const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    Price:{
        type:Number,
    },
    src:{
        type:String,
    }
});
const Products = module.exports = mongoose.model('Products', productsSchema);