import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import URLForm from '../URLForm';
import * as apiService from '../../../services/apiService';
import { message } from 'antd';

// Mock antd message to track calls
jest.mock('antd', () => {
  const original = jest.requireActual('antd');
  return {
    ...original,
    message: {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
    },
  };
});

// Mock API service functions
jest.spyOn(apiService, 'startProcessingURL').mockImplementation(() => Promise.resolve());
jest.spyOn(apiService, 'stopProcessingURL').mockImplementation(() => Promise.resolve());

describe('URLForm', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-undef
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits URL and shows success message', async () => {
    render(<URLForm />);

    const input = screen.getByPlaceholderText('https://google.com');
    const button = screen.getByRole('button', { name: /process url/i });

    fireEvent.change(input, { target: { value: 'https://google.com' } });
    fireEvent.click(button);

    expect(await screen.findByText('https://google.com')).toBeInTheDocument();
    expect(message.success).toHaveBeenCalledWith('URL submitted in backlog');
  });
});
