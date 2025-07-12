import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import URLTable from '../URLTable';
import { IURLData } from '../types';

// Mock the getColumns to simplify testing
jest.mock('../columns', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getColumns: (navigate: jest.Mock, reload: jest.Mock) => [
    {
      title: 'URL',
      dataIndex: 'url',
      render: (url: string) => <span>{url}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'page_title',
    },
  ],
}));

describe('URLTable Component', () => {
  const mockNavigate = jest.fn();
  const mockReload = jest.fn();
  const mockSetSelectedRowKeys = jest.fn();

  const mockData: IURLData[] = [
    {
      url: 'https://google.com',
      page_title: 'Example Title',
      html_version: 'HTML5',
      internal_links: 5,
      external_links: 3,
      has_login_form: false,
      status: 'done',
    },
  ];

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

  test('Should renders table with data and calls setSelectedRowKeys on row selection', () => {
    render(
      <URLTable
        data={mockData}
        selectedRowKeys={[]}
        setSelectedRowKeys={mockSetSelectedRowKeys}
        navigate={mockNavigate}
        reload={mockReload}
      />
    );
    expect(screen.getByText('https://google.com')).toBeInTheDocument();
    expect(screen.getByText('Example Title')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    fireEvent.click(checkboxes[0]);
    expect(mockSetSelectedRowKeys).toHaveBeenCalled();
  });
});
