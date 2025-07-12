import React from 'react';
import { render, screen } from '@testing-library/react';
import PageInfoCard from '../PageInfoCard';
import { IURLDetailsData } from '../../types';

import type { IAppCardProps } from '../../../components/types';

// Mock AppCard for test isolation
jest.mock('../../../components/AppCard', () => (props: IAppCardProps) => (
  <div data-testid="AppCard-mock">
    <h3>{props.title}</h3>
    {props.children}
  </div>
));

describe('PageInfoCard', () => {
  const mockDetails: IURLDetailsData = {
    url: 'https://example.com',
    html_version: 'HTML5',
    page_title: 'Test Page',
    has_login_form: true,
    headings_count: {
      h1: 1,
      h2: 2,
      h3: 0,
    },
    internal_links: 10,
    external_links: 5,
    inaccessible_links: [],
  };

  test('Should renders all page info correctly', () => {
    render(<PageInfoCard details={mockDetails} />);

    expect(screen.getByText('HTML Version:')).toBeInTheDocument();
    expect(screen.getByText('Page Title:')).toBeInTheDocument();
    expect(screen.getByText('Contains Login Form:')).toBeInTheDocument();
    expect(screen.getByText('Headings Count:')).toBeInTheDocument();

    expect(screen.getByText('HTML5')).toBeInTheDocument();
    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText(/"h1": 1/)).toBeInTheDocument();
    expect(screen.getByText(/"h2": 2/)).toBeInTheDocument();
    expect(screen.getByText(/"h3": 0/)).toBeInTheDocument();
  });

  test('renders "No" tag when has_login_form is false', () => {
    render(<PageInfoCard details={{ ...mockDetails, has_login_form: false }} />);
    expect(screen.getByText('No')).toBeInTheDocument();
  });
});
