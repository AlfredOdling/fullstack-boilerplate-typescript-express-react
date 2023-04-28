import { render, screen } from '@testing-library/react';
import { TransactionView } from './components/TransactionView';
import { TransactionType } from '../../app-express/src/api/types';
import { Transaction } from '../../app-express/src/api/types';

describe('<TransactionView/>', () => {
  const transaction: Transaction = {
    amount: 100,
    accountId: 'account_123',
    type: TransactionType.DEPOSIT,
    transaction_id: 'transactionId_123',
    created_at: new Date(),
  };

  it('should render', () => {
    render(<TransactionView transaction={transaction} index={0} />);
  });

  it('should render amount', () => {
    render(<TransactionView transaction={transaction} index={0} />);
    expect(screen.getByText(/100/i)).toBeInTheDocument();
  });

  it('should render accountId', () => {
    render(<TransactionView transaction={transaction} index={0} />);
    expect(screen.getByText(/account_123/i)).toBeInTheDocument();
  });

  it('should render type', () => {
    render(<TransactionView transaction={transaction} index={0} />);
    expect(screen.getByText(/deposit/i)).toBeInTheDocument();
  });

  it('should render balance if first element', () => {
    render(<TransactionView transaction={transaction} index={0} />);
    expect(screen.getByText(/balance/i)).toBeInTheDocument();
  });

  it('should not render balance if not first element', () => {
    render(<TransactionView transaction={transaction} index={1} />);
    expect(screen.queryByText(/balance/i)).not.toBeInTheDocument();
  });
});
