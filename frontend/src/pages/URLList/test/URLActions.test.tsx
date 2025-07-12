import React from 'react';
import { render, screen } from '@testing-library/react';
import URLActions from '../URLActions';

describe('URLActions Component', () => {
  const onSearch = jest.fn();
  const onDelete = jest.fn();
  const onReRun = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should renders input and buttons, buttons disabled when no selection', () => {
    render(
      <URLActions onSearch={onSearch} onDelete={onDelete} onReRun={onReRun} hasSelection={false} />
    );

    expect(screen.getByPlaceholderText(/search url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete selected/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /re-run analysis/i })).toBeDisabled();
  });
});
