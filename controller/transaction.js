const Transaction = require('../model/Tranaction');
exports.getAllTransactions = (req, res) => {
  Transaction.find({
    $or: [{ receiver_id: req.auth._id }, { sender_id: req.auth._id }]
  }).exec((error, transactions) => {
    if (error) {
      return res.status(401).json({ error: 'server error' });
    }
    return res.json({ transactions });
  });
};

exports.getReceivedTransactions = (req, res) => {
  Transaction.find({ receiver_id: req.auth._id }).exec(
    (error, transactions) => {
      if (error) {
        return res.status(401).json({ error: 'server error' });
      }
      return res.json({ transactions });
    }
  );
};

exports.getPaidTransactions = (req, res) => {
  Transaction.find({ sender_id: req.auth._id }).exec((error, transactions) => {
    if (error) {
      return res.status(401).json({ error: 'server error' });
    }
    return res.json({ transactions });
  });
};

exports.depositTransaction = (req, res) => {
  const deposit = new Transaction({ ...req.body, receiver_id: req.auth._id });
  deposit.save((error, transaction) => {
    if (error) {
      return res.status(401).json({ error: 'server errror' });
    }
    req.user.depositBalance(req.body.amount);
    return res.json({ message: 'updated successfully' });
  });
};

exports.withdrawTransaction = (req, res) => {
  const withdraw = new Transaction({ ...req.body, sender_id: req.auth._id });
  withdraw.save((error, transaction) => {
    if (error) {
      return res.status(401).json({ error: 'server errror' });
    }
    req.user.transferBalance(req.body.amount);
    return res.json({ message: 'updated successfully' });
  });
};

exports.moneyTransaction = (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
    sender_id: req.auth._id
  });
  newTransaction.save((error, transaction) => {
    if (error) {
      return res.status(401).json({ error: 'server error' });
    }
    req.receiver.depositBalance(req.body.amount);
    req.user.transferBalance(req.body.amount);
    return res.json({ message: 'update suuccssfully' });
  });
};
