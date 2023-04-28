import { Account, Transaction } from "../../../app-express/src/api/types";

export const getServerStatus = async () => {
  const response = await fetch("http://localhost:5001/ping/", {
    method: "GET",
    mode: "cors",
    headers: {
    "Content-Type": "application/json",
    },
  });

  return response.ok
}

export const getAccount = async (accountId: string) => {
  const response = await fetch("http://localhost:5001/accounts/" + accountId, {
    method: "GET",
    mode: "cors",
    headers: {
    "Content-Type": "application/json",
    },
  });
  
  const account: Account = await response.json();

  return account;
}

export const createTransaction = async ({ accountId, amount }: any) => {
  const response = await fetch("http://localhost:5001/transactions", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
      amount,
    }),
  });
    
  return response;
}

export const getTransactions = async () => {
  const response = await fetch("http://localhost:5001/transactions", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const transactions: Transaction[] = await response.json();

  return transactions;
}