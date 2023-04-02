const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const BankAccount = require('../models/bankAccount');

// define the email validator
const emailValidator = value => {
  console.log('emailValidator value:', value);
  if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw new Error('Invalid email address');
  }
  return true;
};

router.post(
  '/accounts',
  body('accountNumber').isLength({ min: 8, max: 8 }),
  body('balance').isNumeric(),
  body('owner.name').isString(),
  body('owner.email').custom(emailValidator),
  body('type').isIn(['checking', 'savings', 'credit']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountData = req.body;
    const account = new BankAccount(accountData);

    try {
      await account.validate();
      const savedAccount = await account.save();
      res.json(savedAccount);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get('/accounts', async (req, res) => {
  try {
    const accounts = await BankAccount.find({});
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/accounts/:id', async (req, res) => {
  const accountId = req.params.id;

  try {
    const account = await BankAccount.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put(
  '/accounts/:id',
  body('balance').isNumeric(),
  body('owner.name').isString(),
  body('owner.email').isEmail(),
  body('type').isIn(['checking', 'savings', 'credit']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const accountId = req.params.id;
    const updatedAccountData = req.body;

    try {
      const existingAccount = await BankAccount.findById(accountId);
      if (!existingAccount) {
        return res.status(404).json({ error: 'Account not found' });
      }

      existingAccount.set(updatedAccountData);
      await existingAccount.validate();
      const savedAccount = await existingAccount.save();
      res.json(savedAccount);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete('/accounts/:id', async (req, res) => {
  const accountId = req.params.id;

  try {
    const result = await BankAccount.deleteOne({ _id: accountId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
