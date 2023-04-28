import { Account, Transaction } from '../../../../app-express/src/api/types';

export interface TransactionViewProps {
  transaction: Transaction;
  index: number;
  account?: Account;
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}
