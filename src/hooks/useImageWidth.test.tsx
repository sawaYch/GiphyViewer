import { renderHook } from '@testing-library/react-native';
import { useWindowDimensions } from 'react-native';
import { useImageWidth } from './useImageWidth';

jest.mock('react-native', () => ({
  useWindowDimensions: jest.fn(),
}));

describe('useImageWidth', () => {
  it('should return one-third of the window width', () => {
    // Mock the useWindowDimensions hook to return a specific width
    const mockWidth = 300;
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: mockWidth,
      height: 600,
    });

    const { result } = renderHook(() => useImageWidth());

    expect(result.current).toBe(mockWidth / 3);
  });

  it('should update the image width when window width changes', () => {
    // Mock the useWindowDimensions hook to return a different width
    const mockWidth = 360;
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: mockWidth,
      height: 640,
    });

    const { result, rerender } = renderHook(() => useImageWidth());

    expect(result.current).toBe(mockWidth / 3);

    // Change the window width and trigger a rerender
    const newMockWidth = 450;
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: newMockWidth,
      height: 640,
    });

    rerender({});

    expect(result.current).toBe(newMockWidth / 3);
  });
});
