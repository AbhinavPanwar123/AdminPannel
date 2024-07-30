const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Minimum 3 characters are required"],
    required: ["Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  phone:{
    type : Number,
    required : ['Phone Number is required'] 
  },
  address:{
    type:String,
    required: true 
  },
  gstin:{
    type: String,
    required: true 
  },
  password: {
    type: String,
    minLength: [5, "Min length should be 5 characters"],
    required: [false, "Password is required"],
  },
  resetToken:{
    type:String
  }
});

module.exports = mongoose.model('sellerSchema',sellerSchema);