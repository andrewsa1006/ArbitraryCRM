const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Customer Schema
const CustomerSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  custname:{
    type: String,
    required: false
  },
  address:{
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  pcontact: {
    type: String,
    required: true
  },
  customerNotes: {
    type: String,
    required: false
  },
  tickets:[{
    type: Schema.Types.ObjectId,
    ref: 'ticket'
  }]
  
});

mongoose.model('customer', CustomerSchema);