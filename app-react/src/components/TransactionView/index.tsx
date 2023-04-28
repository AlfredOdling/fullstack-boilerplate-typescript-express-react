import { Typography, Stack, Card, Chip, Box } from '@mui/material';

import { TransactionType, TransactionViewProps } from './types';
import { CurrentBalance } from '../CurrentBalance';

export const TransactionView = (props: TransactionViewProps) => {
  const { transaction, index } = props;
  const { amount, accountId, type } = transaction;
  const isFirst = index === 0;

  return (
    <Card>
      <Stack spacing={3} p={3}>
        <Box>
          <Chip
            color={type === TransactionType.DEPOSIT ? 'success' : 'warning'}
            label={type.toUpperCase()}
          />
        </Box>

        <Typography>{`Transferred $${amount} from account ${accountId}`}</Typography>
        {isFirst && <CurrentBalance accountId={accountId} />}
      </Stack>
    </Card>
  );
};
