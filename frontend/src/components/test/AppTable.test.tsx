import React from 'react';
import { render, screen } from '@testing-library/react';
import AppTable from '../AppTable';

// Mock matchMedia before anything else
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

interface ITestData {
  id: string;
  url: string;
  title: string;
}

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
];

const data: ITestData[] = [
  {
    id: '1',
    url: 'https://google.com',
    title: 'Google',
  },
  {
    id: '2',
    url: 'https://example.com',
    title: 'Example',
  },
];

describe('AppTable Component', () => {
  test('Should render table with data and columns', () => {
    render(<AppTable<ITestData> columns={columns} dataSource={data} rowKey="id" pageSize={5} />);

    // Check for column headers
    expect(screen.getByText('URL')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();

    // Check for data rows
    expect(screen.getByText('https://google.com')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });
});
