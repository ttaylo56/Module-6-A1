const mongoose = require('mongoose');
const validator = require('validator');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address.`
    }
  }
});

const BankAccount = mongoose.model('BankAccount', new mongoose.Schema({
  accountNumber: {
    type: String,
    required: [true, 'Please provide an account number.'],
    unique: true,
    minlength: [8, 'The account number should be 8 characters long.'],
    maxlength: [8, 'The account number should be 8 characters long.'],
    trim: true
  },
  balance: {
    type: Number,
    required: [true, 'Please provide a balance.'],
    min: [0, 'The balance cannot be negative.']
  },
  owner: {
    type: ownerSchema,
    required: [true, 'Please provide an owner.']
  },
  type: {
    type: String,
    required: [true, 'Please provide a type.'],
    enum: ['checking', 'savings', 'credit']
  }
}));

module.exports = BankAccount;
