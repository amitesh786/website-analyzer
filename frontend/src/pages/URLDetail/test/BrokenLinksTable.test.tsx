import React from 'react';
import { render, screen } from '@testing-library/react';
import BrokenLinksTable from '../BrokenLinksTable';

// Mock matchMedia for Ant Design
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

describe('BrokenLinksTable', () => {
  const mockLinks = [
    { url: 'https://example.com/broken1', status: 404 },
    { url: 'https://example.com/broken2', status: 500 },
  ];

  test('Should renders table with broken links', () => {
    render(<BrokenLinksTable brokenLinks={mockLinks} />);

    // Heading from AppCard
    expect(screen.getByText(/Broken \/ Inaccessible Links/i)).toBeInTheDocument();

    // Table headers
    expect(screen.getByText('Broken Link')).toBeInTheDocument();
    expect(screen.getByText('Status Code')).toBeInTheDocument();

    // Table rows
    expect(screen.getByText('https://example.com/broken1')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/broken2')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  test('Should renders fallback WHEN no broken links exist', () => {
    render(<BrokenLinksTable brokenLinks={[]} />);

    expect(screen.getByText('No broken links detected.')).toBeInTheDocument();
  });
});
