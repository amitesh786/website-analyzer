import React from 'react';
import { render, screen } from '@testing-library/react';
import AppCard from '../AppCard';

describe('AppCard Component', () => {
  test('Should renders title AND children correctly', () => {
    render(
      <AppCard title="Test Title">
        <div>Card Content</div>
      </AppCard>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('Should renders extra content WHEN provided', () => {
    render(
      <AppCard title="Card with Extra" extra={<span>Extra Action</span>}>
        <div>Extra Content</div>
      </AppCard>
    );

    expect(screen.getByText('Extra Action')).toBeInTheDocument();
  });

  test('Should applies custom style correctly', () => {
    const { container } = render(
      <AppCard title="Styled Card" style={{ backgroundColor: 'lightgray' }}>
        <div>Styled Content</div>
      </AppCard>
    );

    const card = container.querySelector('.ant-card');
    expect(card).toHaveStyle({ backgroundColor: 'lightgray' });
  });
});
