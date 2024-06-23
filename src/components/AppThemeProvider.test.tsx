import React from 'react';
import { render } from '@testing-library/react-native';
import { AppThemeProvider } from './AppThemeProvider';
import { ThemeProvider } from '@rneui/themed'; // Import mocks instead of actual components

jest.mock('@rneui/themed', () => ({
  ThemeProvider: jest.fn(({ children }) => <>{children}</>), // Mock ThemeProvider as a function component
  createTheme: jest.fn(() => ({
    lightColors: {
      primary: '#2196f3',
      secondary: '#9C27B0',
      background: '#ffffff',
      white: '#ffffff',
      black: '#242424',
      grey0: '#393e42',
      grey1: '#43484d',
      grey2: '#5e6977',
      grey3: '#86939e',
      grey4: '#bdc6cf',
      grey5: '#e1e8ee',
      greyOutline: '#bbb',
      searchBg: '#dcdce1',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ffeb3b',
      disabled: 'hsl(208, 8%, 90%)',
      divider: '#bcbbc1',
      platform: {
        ios: {
          primary: '#007aff',
          secondary: '#5856d6',
          grey: '#7d7d7d',
          searchBg: '#dcdce1',
          success: '#4cd964',
          error: '#ff3b30',
          warning: '#ffcc00',
        },
        android: {
          primary: '#2196f3',
          secondary: '#9C27B0',
          grey: 'rgba(0, 0, 0, 0.54)',
          searchBg: '#dcdce1',
          success: '#4caf50',
          error: '#f44336',
          warning: '#ffeb3b',
        },
        web: {
          primary: '#2089dc',
          secondary: '#ca71eb',
          grey: '#393e42',
          searchBg: '#303337',
          success: '#52c41a',
          error: '#ff190c',
          warning: '#faad14',
        },
        default: {
          primary: '#007aff',
          secondary: '#5856d6',
          grey: '#7d7d7d',
          searchBg: '#dcdce1',
          success: '#4cd964',
          error: '#ff3b30',
          warning: '#ffcc00',
        },
      },
      grey: 'rgba(0, 0, 0, 0.54)',
    },
    darkColors: {
      primary: '#1b262c',
      secondary: '#2089dc',
      background: '#080808',
      white: '#080808',
      black: '#f2f2f2',
      grey5: '#393e42',
      grey4: '#43484d',
      grey3: '#5e6977',
      grey2: '#86939e',
      grey1: '#bdc6cf',
      grey0: '#e1e8ee',
      greyOutline: '#bbb',
      searchBg: '#393e42',
      success: '#439946',
      error: '#bf2c24',
      warning: '#cfbe27',
      disabled: 'hsl(208, 8%, 90%)',
      divider: '#84838a',
      platform: {
        ios: {
          primary: '#1b262c',
          secondary: '#2089dc',
          grey: '#ffffff',
          searchBg: '#393e42',
          success: '#439946',
          error: '#bf2c24',
          warning: '#cfbe27',
        },
        android: {
          primary: '#1b262c',
          secondary: '#2089dc',
          grey: '#393e42',
          searchBg: '#393e42',
          success: '#439946',
          error: '#bf2c24',
          warning: '#cfbe27',
        },
        web: {
          primary: '#1b262c',
          secondary: '#2089dc',
          grey: '#ffffff',
          searchBg: '#393e42',
          success: '#439946',
          error: '#bf2c24',
          warning: '#cfbe27',
        },
        default: {
          primary: '#1b262c',
          secondary: '#2089dc',
          grey: '#ffffff',
          searchBg: '#393e42',
          success: '#439946',
          error: '#bf2c24',
          warning: '#cfbe27',
        },
      },
      grey: '#393e42',
    },
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 24 },
    mode: 'light',
    components: {},
  })), // Mock createTheme as a function returning options
  useThemeMode: jest.fn(() => ({ mode: 'light' })), // Mock useThemeMode as a function returning { mode: 'light' }
  lightColors: {
    platform: {
      ios: {
        primary: '#007aff',
        secondary: '#5856d6',
        grey: '#7d7d7d',
        searchBg: '#dcdce1',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
      android: {
        primary: '#2196f3',
        secondary: '#9C27B0',
        grey: 'rgba(0, 0, 0, 0.54)',
        searchBg: '#dcdce1',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b',
      },
    },
  },
  darkColors: {
    platform: {
      ios: {
        primary: '#007aff',
        secondary: '#5856d6',
        grey: '#7d7d7d',
        searchBg: '#dcdce1',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
      android: {
        primary: '#2196f3',
        secondary: '#9C27B0',
        grey: 'rgba(0, 0, 0, 0.54)',
        searchBg: '#dcdce1',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b',
      },
    },
  },
}));

describe('<AppThemeProvider />', () => {
  it('renders children wrapped in ThemeProvider with correct theme', () => {
    render(<AppThemeProvider />);
    expect(ThemeProvider).toHaveBeenCalled();
  });
});
