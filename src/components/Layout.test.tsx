import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useTheme, useThemeMode } from '@rneui/themed';
import Layout from './Layout';

jest.mock('@rneui/themed', () => ({
  useTheme: jest.fn(),
  useThemeMode: jest.fn(),
}));

const mockUseTheme = useTheme as jest.Mock;
const mockUseThemeMode = useThemeMode as jest.Mock;

describe('Layout', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: {
        colors: {
          primary: 'blue',
        },
      },
    });

    mockUseThemeMode.mockReturnValue({
      mode: 'light',
      setMode: jest.fn(),
    });
  });

  it('should render with correct initial theme', () => {
    const { getByText, getByTestId } = render(<Layout>Test Content</Layout>);

    expect(getByText('Giphy Viewer')).toBeTruthy();
    expect(
      getByTestId('dark-mode-toggle-icon').findByProps({ name: 'light-mode' })
        .props.name
    ).toBe('light-mode');
  });

  it('should toggle mode when button is pressed', () => {
    const setModeMock = jest.fn();
    mockUseThemeMode.mockReturnValue({
      mode: 'light',
      setMode: setModeMock,
    });

    const { getByRole } = render(<Layout>Test Content</Layout>);

    const button = getByRole('button');
    fireEvent.press(button);

    expect(setModeMock).toHaveBeenCalledWith('dark');
  });

  it('should use dark mode icon when in dark mode', () => {
    mockUseThemeMode.mockReturnValue({
      mode: 'dark',
      setMode: jest.fn(),
    });

    const { getByTestId } = render(<Layout>Test Content</Layout>);

    expect(
      getByTestId('dark-mode-toggle-icon').findByProps({ name: 'dark-mode' })
        .props.name
    ).toBe('dark-mode');
  });
});
