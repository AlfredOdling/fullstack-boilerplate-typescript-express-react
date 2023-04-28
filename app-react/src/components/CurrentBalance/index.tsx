import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { CurrentBalanceProps } from './types';
import { getAccount } from '../../api/requests';
import { Account } from '../../../../app-express/src/api/types';

export const CurrentBalance = (props: CurrentBalanceProps) => {
  const { accountId } = props;
  const [account, setAccount] = useState<Account | undefined>();

  useEffect(() => {
    const getAccount_ = async () => {
      const account = await getAccount(accountId);
      setAccount(account);
    };

    getAccount_();
  }, []);

  return <Typography>{`The current balance is $${account?.balance}`}</Typography>;
};
