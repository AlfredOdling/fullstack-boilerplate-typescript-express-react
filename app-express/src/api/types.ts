export interface Account {
  accountId: string;
  balance: number;
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

export interface Transaction {
  transaction_id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  created_at: Date;
}
