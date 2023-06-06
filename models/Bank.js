const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;
const bankSchema = new mongoose.Schema({
  nameBank: {
    type: String,
    required: true
  },
  nomorRekening: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  usersId:{
    type:ObjectId,
    ref:"Users"
  }
})

module.exports = mongoose.model('Bank', bankSchema)