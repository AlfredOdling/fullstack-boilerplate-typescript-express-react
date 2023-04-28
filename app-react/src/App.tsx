import { useEffect, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { createTransaction, getServerStatus, getTransactions } from './api/requests';
import { Transaction } from '../../app-express/src/api/types';
import { TransactionView } from './components/TransactionView';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [serverIsUp, setServerIsUp] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const orderedTransactions = transactions?.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ok = await getServerStatus();
      setServerIsUp(ok);

      const transactions = await getTransactions();
      setTransactions(transactions);
      setLoading(false);
    };

    fetchData();
  }, []);

  const createTransactionHandler = async () => {
    setLoading(true);
    const res = await createTransaction({ accountId, amount });

    if (res.ok) {
      setAccountId('');
      setAmount('');

      const transactions = await getTransactions();
      setTransactions(transactions);
    }
    setLoading(false);
  };

  if (!serverIsUp) {
    return (
      <Stack p={6} spacing={6}>
        <Typography>Server is down</Typography>
      </Stack>
    );
  }

  if (loading) {
    return (
      <Stack p={6} spacing={6}>
        <Typography>Loading</Typography>
      </Stack>
    );
  }

  return (
    <Stack p={6} direction="row" spacing={6}>
      <Stack width={'35%'} spacing={3}>
        <Typography variant="h5" mb={3}>
          Submit new transaction
        </Typography>

        <TextField
          required
          label="Account id"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />

        <TextField
          required
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Button
          startIcon={<SendIcon />}
          variant="contained"
          disabled={!accountId || !amount}
          onClick={createTransactionHandler}
        >
          Submit
        </Button>
      </Stack>

      <Stack width={'65%'} spacing={3}>
        <Typography variant="h5" mb={3}>
          Transaction history
        </Typography>

        {orderedTransactions?.map((transaction, index) => (
          <TransactionView index={index} key={`key-${index}`} transaction={transaction} />
        ))}
      </Stack>
    </Stack>
  );
};

export default App;
