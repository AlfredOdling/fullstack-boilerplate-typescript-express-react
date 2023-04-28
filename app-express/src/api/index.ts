import express, { Request, Response } from 'express';
import { Account, Transaction, TransactionType } from './types';

const router = express.Router();

const accounts: Account[] = [];
const transactions: Transaction[] = [];

router.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

router.post('/transactions', (req: Request, res: Response) => {
  let { accountId, amount } = req.body;
  amount = parseInt(amount);
  const account = accounts.find((account) => accountId === account.accountId);

  // Create a transaction
  transactions.push({
    transaction_id: Math.random().toString(36).substring(7),
    accountId,
    amount,
    type: amount > 0 ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL,
    created_at: new Date(),
  });

  // Update the account balance or create a new account
  if (!account) {
    accounts.push({ accountId, balance: amount });
  } else {
    account.balance += amount;
  }

  res.sendStatus(200);
});

router.get('/transactions', (req: Request, res: Response) => {
  res.send(transactions);
});

router.get('/accounts/:account_id', (req: Request, res: Response) => {
  const { account_id } = req.params;
  const account = accounts.find((account) => account.accountId === account_id);

  res.send(account);
});

export default router;
