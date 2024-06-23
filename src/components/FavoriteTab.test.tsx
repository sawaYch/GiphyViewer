import React from 'react';
import { render } from '@testing-library/react-native';
import FavoriteTab from './FavoriteTab';

describe('FavoriteTab', () => {
  beforeEach(() => {
    // Clear any mocked implementations or mockReturnValue setups before each test
    jest.clearAllMocks();
  });

  it('should render FavoriteTab correctly', () => {
    const { getByTestId } = render(<FavoriteTab />);

    // Verify if FlatList is rendered
    const flatList = getByTestId('favorite-list');
    expect(flatList).toBeDefined();
  });
});
