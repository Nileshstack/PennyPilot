const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
 userid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'users',
  required: true,
},

  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  reference: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  }
}, { timestamps: true });

const transactionModel = mongoose.model('transection', transactionSchema);

module.exports = transactionModel;
