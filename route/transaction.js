const express = require('express');
const router = express.Router();

const {
  getAllTransactions,
  getPaidTransactions,
  getReceivedTransactions,
  depositTransaction,
  withdrawTransaction,
  moneyTransaction
} = require('../controller/transaction');

const { isSignedIn, isAuthenticated } = require('../middleware/user');
const { getReceiver } = require('../middleware/transaction');

router.param('receiveId', getReceiver);
router.get('/transaction', isSignedIn, getAllTransactions);
router.get('/transaction/receive', isSignedIn, getReceivedTransactions);
router.get('/transaction/send', isSignedIn, getPaidTransactions);
router.post(
  '/transaction/deposit',
  isSignedIn,
  isAuthenticated,
  depositTransaction
);
router.post(
  '/transaction/withdraw',
  isSignedIn,
  isAuthenticated,
  withdrawTransaction
);
router.post(
  '/transaction/:receiveId',
  isSignedIn,
  isAuthenticated,
  moneyTransaction
);
module.exports = router;
