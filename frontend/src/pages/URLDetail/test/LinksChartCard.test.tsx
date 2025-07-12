import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LinksChartCard from '../LinksChartCard';

import type { IAppChartProps, IAppCardProps } from '../../../components/types';

jest.mock('../../../components/AppChart', () => (props: IAppChartProps) => (
  <div data-testid="AppChart-mock">{JSON.stringify(props.options)}</div>
));

jest.mock('../../../components/AppCard', () => (props: IAppCardProps) => (
  <div data-testid="AppCard-mock">
    <h3>{props.title}</h3>
    {props.children}
    {props.extra}
  </div>
));

describe('LinksChartCard', () => {
  const defaultProps = {
    chartType: 'pie' as const,
    setChartType: jest.fn(),
    internalLinks: 10,
    externalLinks: 5,
  };

  test('Should renders correctly with pie chart', () => {
    render(<LinksChartCard {...defaultProps} />);

    expect(screen.getByText('Internal vs External Links')).toBeInTheDocument();
    expect(screen.getByText('Pie')).toBeInTheDocument();
    expect(screen.getByText('Bar')).toBeInTheDocument();

    const chart = screen.getByTestId('AppChart-mock');
    expect(chart.textContent).toContain('"type":"pie"');
    expect(chart.textContent).toContain('"name":"Internal Links"');
    expect(chart.textContent).toContain('"name":"External Links"');
  });

  test('Should calls setChartType on button click', () => {
    render(<LinksChartCard {...defaultProps} />);

    const barButton = screen.getByText('Bar');
    fireEvent.click(barButton);

    expect(defaultProps.setChartType).toHaveBeenCalledWith('bar');
  });
});
