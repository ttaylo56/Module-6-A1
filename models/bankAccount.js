const mongoose = require('mongoose');
const validator = require('validator');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email address'
    }
  }
});

const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 8,
    maxlength: 8
  },
  balance: {
    type: Number,
    required: true,
    min: 0
  },
  owner: {
    type: ownerSchema,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['checking', 'savings', 'credit']
  }
});

// const BankAccount = mongoose.model('BankAccount', bankAccountSchema);
module.exports = mongoose.model('BankAccount', bankAccountSchema);

