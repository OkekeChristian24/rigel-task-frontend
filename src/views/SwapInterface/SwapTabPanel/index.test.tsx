import React from 'react';
import { render, screen } from '@testing-library/react';
import SwapTabPanel from './index';

test('renders learn react link', () => {
  render(<SwapTabPanel />);
  const connectWallet = screen.getByText(/Connect Wallet/i);
  expect(connectWallet).toBeInTheDocument();
});
