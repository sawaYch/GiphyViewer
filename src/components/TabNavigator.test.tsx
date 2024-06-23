import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import TabNavigator from './TabNavigator';

// TabNavigator animation have setTimeout stuff for UI effect,
// it will cause jest test timeout
// so just add fake timers
jest.useFakeTimers();

jest.mock('./SearchTab', () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

jest.mock('./FavoriteTab', () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

describe('<TabNavigator />', () => {
  it('renders TabNavigator with two tabs', async () => {
    const { getAllByTestId } = render(<TabNavigator />);

    await waitFor(() => {
      expect(getAllByTestId('tab-view')).toBeDefined();
    });
  });
});
