const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const TransactionSchmea = new mongoose.Schema({
  amount: { type: Number, required: true },
  receiver_id: { type: ObjectId, ref: 'user', default: null },
  sender_id: { type: ObjectId, ref: 'user', default: null },
  details: { type: String, required: true },
  receive_status: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model('transaction', TransactionSchmea);
