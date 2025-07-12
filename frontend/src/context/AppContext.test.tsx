import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from './AppContext';

const TestComponent = () => {
  const { globalState, setGlobalState, theme, setTheme } = useAppContext();
  return (
    <div>
      <div data-testid="user">{globalState.user ?? 'no-user'}</div>
      <div data-testid="theme">{theme}</div>
      <button onClick={() => setGlobalState({ user: 'test-user' })} data-testid="set-user-btn">
        Set User
      </button>
      <button onClick={() => setTheme('dark')} data-testid="set-theme-btn">
        Set Theme
      </button>
    </div>
  );
};

describe('AppContext', () => {
  test('throws error when useAppContext is used outside provider', () => {
    // eslint-disable-next-line no-undef
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      'useAppContext must be used within an AppProvider'
    );
    jest.restoreAllMocks();
  });
});
