import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GifListRenderer } from './GifListRenderer';

// Mock the necessary components and props
const mockItem = {
  id: 'gif1',
  images: {
    fixed_width: {
      url: 'https://example.com/gif1.gif',
      height: 100,
      width: 100,
      webp: 'https://example.com/gif1.webp',
    },
  },
  url: '',
  alt_text: '',
  title: '',
};

const mockAddToFavorite = jest.fn();
const mockFavorites = [{ id: 'gif1', source: 'https://example.com/gif1.gif' }];

describe('GifListRenderer', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <GifListRenderer
        item={mockItem}
        imageWidth={100}
        addToFavorite={mockAddToFavorite}
        favorites={mockFavorites}
      />
    );

    // Verify if the image and placeholder are rendered
    const imageElement = getByTestId('gif-image');
    expect(imageElement).toBeDefined();
  });

  it('should call addToFavorite function when pressed', () => {
    const { getByTestId } = render(
      <GifListRenderer
        item={mockItem}
        imageWidth={100}
        addToFavorite={mockAddToFavorite}
        favorites={mockFavorites}
      />
    );

    // Simulate press event on Pressable component
    const pressableComponent = getByTestId('pressable');
    fireEvent.press(pressableComponent);

    // Verify if addToFavorite function was called correctly
    expect(mockAddToFavorite).toHaveBeenCalled();
    expect(mockAddToFavorite).toHaveBeenCalledWith({
      id: mockItem.id,
      source: mockItem.images.fixed_width.url,
    });
  });

  it('should call addToFavorite function when pressed (star icon change)', () => {
    const mockItem2 = {
      id: 'gif2',
      images: {
        fixed_width: {
          url: 'https://example.com/gif1.gif',
          height: 100,
          width: 100,
          webp: 'https://example.com/gif1.webp',
        },
      },
      url: '',
      alt_text: '',
      title: '',
    };

    const { getByTestId } = render(
      <GifListRenderer
        item={mockItem2}
        imageWidth={100}
        addToFavorite={mockAddToFavorite}
        favorites={mockFavorites}
      />
    );

    // Simulate press event on Pressable component
    const pressableComponent = getByTestId('pressable');
    fireEvent.press(pressableComponent);

    // Verify if addToFavorite function was called correctly
    expect(mockAddToFavorite).toHaveBeenCalled();
    expect(mockAddToFavorite).toHaveBeenCalledWith({
      id: mockItem.id,
      source: mockItem.images.fixed_width.url,
    });
  });
});
