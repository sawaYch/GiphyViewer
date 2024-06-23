import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FavoriteListRenderer } from './FavoriteListRenderer';

// Mock the necessary components and props
const mockItem = {
  id: 'favorite1',
  source: 'https://example.com/favorite1.gif',
};

const mockFavorites = [
  { id: 'favorite1', source: 'https://example.com/favorite1.gif' },
];

const mockRemoveFavorite = jest.fn();
const mockShareFavorite = jest.fn();

describe('FavoriteListRenderer', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <FavoriteListRenderer
        item={mockItem}
        imageWidth={100}
        removeFavorite={mockRemoveFavorite}
        shareFavorite={mockShareFavorite}
        favorites={mockFavorites}
      />
    );

    // Verify if the image and placeholder are rendered
    const imageElement = getByTestId('favorite-image');
    expect(imageElement).toBeDefined();
  });

  it('should call removeFavorite function when remove icon pressed', () => {
    const { getByTestId } = render(
      <FavoriteListRenderer
        item={mockItem}
        imageWidth={100}
        removeFavorite={mockRemoveFavorite}
        shareFavorite={mockShareFavorite}
        favorites={mockFavorites}
      />
    );

    // Simulate press event on remove Pressable component
    const removePressable = getByTestId('remove-favorite');
    fireEvent.press(removePressable);

    // Verify if removeFavorite function was called correctly
    expect(mockRemoveFavorite).toHaveBeenCalled();
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockItem.id);
  });

  it('should call shareFavorite function when share icon pressed', () => {
    const { getByTestId } = render(
      <FavoriteListRenderer
        item={mockItem}
        imageWidth={100}
        removeFavorite={mockRemoveFavorite}
        shareFavorite={mockShareFavorite}
        favorites={mockFavorites}
      />
    );

    // Simulate press event on share Pressable component
    const sharePressable = getByTestId('share-favorite');
    fireEvent.press(sharePressable);

    // Verify if shareFavorite function was called correctly
    expect(mockShareFavorite).toHaveBeenCalled();
    expect(mockShareFavorite).toHaveBeenCalledWith(mockItem.source);
  });

  it('should call shareFavorite function when share icon pressed (star icon change)', () => {
    const mockItem2 = {
      id: 'gif2',
      source: 'https://example.com/gif1.gif',
    };

    const { getByTestId } = render(
      <FavoriteListRenderer
        item={mockItem2}
        imageWidth={100}
        removeFavorite={mockRemoveFavorite}
        shareFavorite={mockShareFavorite}
        favorites={mockFavorites}
      />
    );

    // Simulate press event on share Pressable component
    const sharePressable = getByTestId('share-favorite');
    fireEvent.press(sharePressable);

    // Verify if shareFavorite function was called correctly
    expect(mockShareFavorite).toHaveBeenCalled();
    expect(mockShareFavorite).toHaveBeenCalledWith(mockItem.source);
  });
});
