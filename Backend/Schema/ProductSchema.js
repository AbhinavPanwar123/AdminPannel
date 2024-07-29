const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:[true,'Product name is required'],
        minLength:[3,'Product name must contain atleast 3 characters'],
        trim:true
    },
    Description:{
        type:String,
        required:[true,'Product must have description']
    },
    price:{
        type:Number,
        required:[true,'Product must have price'],
        min:[0,'Price should be a positive number']
    },
    quantity:{
        type:Number,
        required:[true,'Product quantity is required'],
        min:[0,'Quantity must be a positive number']
    },
    shipping:{
        type:Boolean,
        default:false
    },
    seller_id:{
        type:String,
        required:true
    }
});

module.exports = ('productSchema',productSchema);