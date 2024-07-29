const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[3,'Minimum 3 characters are required'],
        required:[true,'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: [5, 'Min length should be 5 characters'],
        required: [false, 'Password is required']
    },
    newpassword: {
        type: String,
        minLength: [5, 'Min length should be 5 characters'],
    },
    resetToken : {
        type:String
    }
});


module.exports = mongoose.model('userSchema', userSchema);