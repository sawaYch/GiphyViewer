import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SearchTab from './SearchTab';
import { useQuery } from '@tanstack/react-query';

// Mocking the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('SearchTab', () => {
  beforeEach(() => {
    // Clear any mocked implementations or mockReturnValue setups before each test
    jest.clearAllMocks();
  });

  it('should render SearchTab correctly', () => {
    // Mocking useQuery hook response
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isPlaceholderData: false,
      isRefetching: false,
    });

    const { getByPlaceholderText, getByTestId } = render(<SearchTab />);

    // Verify if SearchBar is rendered
    const searchBar = getByPlaceholderText('Search your favorite gif 💝');
    expect(searchBar).toBeDefined();

    // Verify if FlatList is rendered
    const flatList = getByTestId('gif-list');
    expect(flatList).toBeDefined();
  });

  it('should trigger search and refetch correctly', async () => {
    // Mocking useQuery hook response
    const mockRefetch = jest.fn();
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
      isPlaceholderData: false,
      isRefetching: false,
    });

    const { getByPlaceholderText } = render(<SearchTab />);

    // Trigger search action
    const searchBar = getByPlaceholderText('Search your favorite gif 💝');
    fireEvent.changeText(searchBar, 'cat'); // Simulate typing 'cat'
    fireEvent(searchBar, 'blur'); // Trigger onBlur event to execute searchGif()

    // Wait for refetch to be called
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('should show error message', () => {
    // Mocking useQuery hook response
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: 'mock error',
      refetch: jest.fn(),
      isPlaceholderData: false,
      isRefetching: false,
    });

    const { getByText } = render(<SearchTab />);

    // Verify if FlatList is rendered
    const flatList = getByText('☠️ Some error occur... Please try again!');
    expect(flatList).toBeDefined();
  });

  it('should show items', () => {
    // Mocking useQuery hook response
    (useQuery as jest.Mock).mockReturnValue({
      data: [
        {
          title: '',
          id: '1',
          alt_text: 'test',
          images: {
            fixed_width: {
              width: 100,
              height: 100,
              url: 'test',
              webp: 'test',
            },
          },
        },
      ],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isPlaceholderData: false,
      isRefetching: false,
    });

    const { getByTestId } = render(<SearchTab />);

    // Verify if FlatList is rendered
    const gifImage = getByTestId('gif-image');
    const pressableComponent = getByTestId('pressable');
    fireEvent.press(pressableComponent);
    expect(gifImage).toBeDefined();
  });
});
